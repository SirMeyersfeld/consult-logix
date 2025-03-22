
/**
 * Utility functions for processing audio transcriptions and extracting medical information
 */

// List of medical and prescription-related keywords to identify
const MEDICAL_KEYWORDS = {
  MEDICATIONS: [
    /\b\d+\s*mg\b/i, /\b\d+\s*mcg\b/i, /\b\d+\s*ml\b/i, 
    /\b\d+\s*tablets?\b/i, /\b\d+\s*capsules?\b/i,
    /\btablet(s)?\b/i, /\bcapsule(s)?\b/i, /\bpill(s)?\b/i,
    /\b(amoxicillin|lisinopril|metformin|atorvastatin|amlodipine|losartan|albuterol|omeprazole|levothyroxine|gabapentin)\b/i,
  ],
  DOSAGE: [
    /\b\d+\s*times?\s*daily\b/i, /\b\d+\s*times?\s*a\s*day\b/i,
    /\bevery\s+\d+\s+hours?\b/i, /\btwice\s+daily\b/i, 
    /\bonce\s+daily\b/i, /\bthree\s+times\s+daily\b/i,
  ],
  INSTRUCTIONS: [
    /\b(before|after|with)\s+meals?\b/i, 
    /\b(before|at|after)\s+bedtime\b/i, 
    /\bon\s+an\s+empty\s+stomach\b/i,
  ],
  DURATION: [
    /\bfor\s+\d+\s+(day|week|month)(s)?\b/i, 
    /\buntil\s+\w+\b/i,
  ],
  SECTIONS: [
    /\bprescri(be|ption|bed)\b/i, /\bdiagnosis\b/i, 
    /\btreatment\b/i, /\bfollow[\s-]up\b/i,
    /\bsymptoms?\b/i, /\ballerg(y|ies|ic)\b/i, 
    /\bside[\s-]effects?\b/i, /\bdosage\b/i,
    /\binstructions?\b/i, /\bcontinue\b/i, 
    /\bnext\s+appointment\b/i, /\breferral\b/i,
  ]
};

/**
 * Process a transcript to extract and organize medical information
 * @param text - The raw transcript text
 * @returns A structured version of the transcript with labeled medical information
 */
export const processTranscript = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  // Split the text into sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const structuredResults: { [key: string]: string[] } = {
    PRESCRIPTION: [],
    DIAGNOSIS: [],
    INSTRUCTIONS: [],
    MEDICATION: [],
    FOLLOW_UP: [],
    OTHER: []
  };
  
  // Analyze each sentence and categorize based on content
  sentences.forEach(sentence => {
    const trimmedSentence = sentence.trim();
    
    // Categorize the sentence based on its content
    if (/\bprescri(be|ption|bed)\b/i.test(trimmedSentence)) {
      structuredResults.PRESCRIPTION.push(trimmedSentence);
    } else if (/\bdiagnosis\b/i.test(trimmedSentence)) {
      structuredResults.DIAGNOSIS.push(trimmedSentence);
    } else if (
      /\binstruction/i.test(trimmedSentence) || 
      MEDICAL_KEYWORDS.INSTRUCTIONS.some(pattern => pattern.test(trimmedSentence))
    ) {
      structuredResults.INSTRUCTIONS.push(trimmedSentence);
    } else if (/\bfollow[\s-]up\b/i.test(trimmedSentence)) {
      structuredResults.FOLLOW_UP.push(trimmedSentence);
    } else if (
      MEDICAL_KEYWORDS.MEDICATIONS.some(pattern => pattern.test(trimmedSentence)) || 
      MEDICAL_KEYWORDS.DOSAGE.some(pattern => pattern.test(trimmedSentence))
    ) {
      structuredResults.MEDICATION.push(trimmedSentence);
    } else if (hasMedicalKeywords(trimmedSentence)) {
      structuredResults.OTHER.push(trimmedSentence);
    }
  });
  
  // Format the results
  let result = '';
  Object.entries(structuredResults).forEach(([category, items]) => {
    if (items.length > 0) {
      if (result) result += '\n\n';
      result += `${category}: ${items.join('. ')}`;
    }
  });
  
  return result;
};

/**
 * Check if text contains any medical keywords
 * @param text - Text to analyze
 * @returns Boolean indicating if medical keywords were found
 */
const hasMedicalKeywords = (text: string): boolean => {
  return Object.values(MEDICAL_KEYWORDS).some(patternList => 
    patternList.some(pattern => pattern.test(text))
  );
};

/**
 * Generate a suggested prescription based on the transcript
 * @param transcript - The processed transcript
 * @returns A formatted prescription suggestion
 */
export const generatePrescriptionSuggestion = (transcript: string): string => {
  if (!transcript) return '';
  
  // Extract medication information from the transcript
  const medications = extractMedicationDetails(transcript);
  
  if (medications.length === 0) {
    return 'No clear medication details found in the transcript.';
  }
  
  // Format the prescription suggestion
  let suggestion = 'SUGGESTED PRESCRIPTION:\n\n';
  medications.forEach((med, index) => {
    suggestion += `${index + 1}. ${med.name}${med.dosage ? ' ' + med.dosage : ''}\n`;
    if (med.instructions) suggestion += `   Instructions: ${med.instructions}\n`;
    if (med.duration) suggestion += `   Duration: ${med.duration}\n`;
    suggestion += '\n';
  });
  
  return suggestion;
};

/**
 * Extract medication details from transcript
 * @param transcript - The processed transcript
 * @returns Array of medication objects with extracted details
 */
const extractMedicationDetails = (transcript: string): Array<{
  name: string;
  dosage?: string;
  instructions?: string;
  duration?: string;
}> => {
  if (!transcript) return [];
  
  const medications: Array<{
    name: string;
    dosage?: string;
    instructions?: string;
    duration?: string;
  }> = [];
  
  // Simple extraction logic - could be enhanced with more sophisticated NLP
  const medicationSection = transcript.match(/MEDICATION:([^]*?)(?=(PRESCRIPTION:|DIAGNOSIS:|INSTRUCTIONS:|FOLLOW_UP:|$))/i);
  
  if (!medicationSection) return medications;
  
  const medText = medicationSection[1];
  const medLines = medText.split('.');
  
  medLines.forEach(line => {
    // Look for medication names and dosages
    const medMatch = line.match(/\b([A-Za-z]+)\b\s+(\d+\s*(?:mg|mcg|ml))/i);
    if (medMatch) {
      // Initialize with optional properties to fix the TypeScript errors
      const medInfo: {
        name: string;
        dosage?: string;
        instructions?: string;
        duration?: string;
      } = {
        name: medMatch[1],
        dosage: medMatch[2]
      };
      
      // Look for instructions
      const instructionsMatch = line.match(/\b(take|use)\b\s+([^.]+)/i);
      if (instructionsMatch) {
        medInfo.instructions = instructionsMatch[0];
      }
      
      // Look for duration
      const durationMatch = line.match(/\bfor\s+\d+\s+(?:day|week|month)s?\b/i);
      if (durationMatch) {
        medInfo.duration = durationMatch[0];
      }
      
      medications.push(medInfo);
    }
  });
  
  return medications;
};

/**
 * Save recording metadata to localStorage
 * @param recording - Recording object to save
 */
export const saveRecording = (recording: {
  name: string;
  url: string;
  date: string;
  doctor: string;
  transcript?: string;
}) => {
  const existingRecordings = JSON.parse(localStorage.getItem('medicalRecordings') || '[]');
  const updatedRecordings = [...existingRecordings, recording];
  localStorage.setItem('medicalRecordings', JSON.stringify(updatedRecordings));
  return updatedRecordings;
};

/**
 * Get all saved recordings from localStorage
 * @returns Array of recording objects
 */
export const getRecordings = () => {
  return JSON.parse(localStorage.getItem('medicalRecordings') || '[]');
};

/**
 * Check if browser supports speech recognition
 * @returns Boolean indicating if speech recognition is supported
 */
export const isSpeechRecognitionSupported = (): boolean => {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
};
