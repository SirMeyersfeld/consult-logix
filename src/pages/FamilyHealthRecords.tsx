
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, UserRound } from "lucide-react";
import Navbar from '../components/Navbar';

// Sample family member data
const initialFamilyMembers = [
  { id: 1, name: "Sarah Johnson", relation: "Spouse", age: 35, conditions: "Asthma, Allergies", lastCheckup: "2023-09-15" },
  { id: 2, name: "Michael Johnson", relation: "Son", age: 10, conditions: "None", lastCheckup: "2023-10-22" },
  { id: 3, name: "Emma Johnson", relation: "Daughter", age: 7, conditions: "Eczema", lastCheckup: "2023-11-05" },
];

const FamilyHealthRecords = () => {
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    relation: '',
    age: '',
    conditions: '',
    lastCheckup: ''
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.relation) {
      setFamilyMembers([
        ...familyMembers,
        {
          id: Date.now(),
          name: newMember.name,
          relation: newMember.relation,
          age: parseInt(newMember.age) || 0,
          conditions: newMember.conditions || 'None',
          lastCheckup: newMember.lastCheckup || 'Not recorded'
        }
      ]);
      setNewMember({
        name: '',
        relation: '',
        age: '',
        conditions: '',
        lastCheckup: ''
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveMember = (id) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Family Health Records</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
            <PlusCircle size={18} />
            {showAddForm ? 'Cancel' : 'Add Family Member'}
          </Button>
        </div>

        {showAddForm && (
          <div className="bg-card p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Family Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Relationship</label>
                <input
                  type="text"
                  name="relation"
                  value={newMember.relation}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="e.g., Spouse, Child"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newMember.age}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Age"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Medical Conditions</label>
                <input
                  type="text"
                  name="conditions"
                  value={newMember.conditions}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Separate with commas"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Checkup</label>
                <input
                  type="date"
                  name="lastCheckup"
                  value={newMember.lastCheckup}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleAddMember}>Add Member</Button>
            </div>
          </div>
        )}

        <div className="bg-card rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Medical Conditions</TableHead>
                <TableHead>Last Checkup</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familyMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserRound size={16} className="text-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.relation}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.conditions}</TableCell>
                  <TableCell>{member.lastCheckup}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FamilyHealthRecords;
