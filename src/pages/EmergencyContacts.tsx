import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Phone, Mail, User, MapPin, Plus, Trash2, Edit, Heart, Stethoscope, UserCircle } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  isPrimary: boolean;
  category: 'personal' | 'medical' | 'emergency';
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      relationship: "Primary Care Physician",
      phone: "555-123-4567",
      email: "dr.johnson@healthcare.com",
      address: "123 Medical Center Dr, Springfield",
      isPrimary: true,
      category: 'medical'
    },
    {
      id: 2,
      name: "Michael Smith",
      relationship: "Spouse",
      phone: "555-987-6543",
      email: "michael@example.com",
      address: "456 Family Lane, Springfield",
      isPrimary: true,
      category: 'personal'
    },
    {
      id: 3,
      name: "Springfield Emergency",
      relationship: "Hospital",
      phone: "555-911-0000",
      email: "emergency@springfield-hospital.org",
      address: "789 Emergency Blvd, Springfield",
      isPrimary: false,
      category: 'emergency'
    },
    {
      id: 4,
      name: "Dr. Robert Chen",
      relationship: "Cardiologist",
      phone: "555-456-7890",
      email: "dr.chen@heartclinic.com",
      address: "101 Specialist Ave, Springfield",
      isPrimary: false,
      category: 'medical'
    }
  ]);
  
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    isPrimary: false,
    category: 'personal'
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  
  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      isPrimary: false,
      category: 'personal'
    });
    setEditingId(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddContact = () => {
    if (!formData.name || !formData.phone) {
      toast.error("Name and phone number are required");
      return;
    }
    
    if (editingId !== null) {
      setContacts(contacts.map(contact => 
        contact.id === editingId ? { ...formData, id: editingId } : contact
      ));
      toast.success("Contact updated successfully!");
    } else {
      const newContact = {
        ...formData,
        id: Math.max(0, ...contacts.map(c => c.id)) + 1
      };
      setContacts([...contacts, newContact]);
      toast.success("Contact added successfully!");
    }
    
    resetForm();
    setOpen(false);
  };
  
  const handleEdit = (id: number) => {
    const contactToEdit = contacts.find(c => c.id === id);
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        relationship: contactToEdit.relationship,
        phone: contactToEdit.phone,
        email: contactToEdit.email,
        address: contactToEdit.address,
        isPrimary: contactToEdit.isPrimary,
        category: contactToEdit.category
      });
      setEditingId(id);
      setOpen(true);
    }
  };
  
  const handleDelete = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed successfully!");
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal': return <UserCircle className="h-5 w-5 text-blue-500" />;
      case 'medical': return <Stethoscope className="h-5 w-5 text-green-500" />;
      case 'emergency': return <Heart className="h-5 w-5 text-red-500" />;
      default: return <User className="h-5 w-5" />;
    }
  };
  
  const filteredByCategory = (category: 'personal' | 'medical' | 'emergency') => {
    return contacts.filter(contact => contact.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Emergency Contacts</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your emergency contacts for quick access during critical situations.
            </p>
          </div>
          
          <div className="flex justify-end mb-6">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
                  <DialogDescription>
                    {editingId 
                      ? 'Update the contact information below.' 
                      : 'Fill in the details to add a new emergency contact.'}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="relationship" className="text-right">Relationship</Label>
                    <Input 
                      id="relationship" 
                      name="relationship" 
                      value={formData.relationship} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})} 
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="personal">Personal</option>
                      <option value="medical">Medical</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isPrimary" className="text-right">Primary Contact</Label>
                    <div className="col-span-3 flex items-center">
                      <input 
                        type="checkbox"
                        id="isPrimary" 
                        name="isPrimary"
                        checked={formData.isPrimary}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">Mark as primary contact</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" onClick={handleAddContact}>
                    {editingId ? 'Save Changes' : 'Add Contact'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle>Emergency Services</CardTitle>
                </div>
                <CardDescription>Critical contacts for emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredByCategory('emergency').length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No emergency services contacts added.
                  </p>
                ) : (
                  filteredByCategory('emergency').map((contact) => (
                    <div key={contact.id} className="border rounded-md p-3 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(contact.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this contact.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(contact.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="grid gap-1 mt-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                        </div>
                        {contact.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                          </div>
                        )}
                        {contact.address && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span>{contact.address}</span>
                          </div>
                        )}
                      </div>
                      
                      {contact.isPrimary && (
                        <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-green-500" />
                  <CardTitle>Medical Professionals</CardTitle>
                </div>
                <CardDescription>Your healthcare providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredByCategory('medical').length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No medical contacts added.
                  </p>
                ) : (
                  filteredByCategory('medical').map((contact) => (
                    <div key={contact.id} className="border rounded-md p-3 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(contact.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this contact.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(contact.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="grid gap-1 mt-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                        </div>
                        {contact.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                          </div>
                        )}
                        {contact.address && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span>{contact.address}</span>
                          </div>
                        )}
                      </div>
                      
                      {contact.isPrimary && (
                        <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            
            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  <CardTitle>Personal Contacts</CardTitle>
                </div>
                <CardDescription>Family members and friends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredByCategory('personal').length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No personal contacts added.
                  </p>
                ) : (
                  filteredByCategory('personal').map((contact) => (
                    <div key={contact.id} className="border rounded-md p-3 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(contact.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this contact.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(contact.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      
                      <div className="grid gap-1 mt-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                        </div>
                        {contact.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                          </div>
                        )}
                        {contact.address && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span>{contact.address}</span>
                          </div>
                        )}
                      </div>
                      
                      {contact.isPrimary && (
                        <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Emergency Information Card</CardTitle>
              <CardDescription>Download and print this card to keep in your wallet.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-red-500">EMERGENCY CONTACTS</h3>
                  <p className="text-sm">In case of emergency, please contact:</p>
                </div>
                
                <div className="space-y-3">
                  {contacts.filter(c => c.isPrimary).map((contact) => (
                    <div key={contact.id} className="text-sm">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(contact.category)}
                        <span className="font-semibold">{contact.name}</span>
                      </div>
                      <div className="grid grid-cols-[20px_1fr] gap-1 mt-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.phone}</span>
                        
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.relationship}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {contacts.filter(c => c.isPrimary).length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-2">
                    No primary contacts selected.
                  </p>
                )}
                
                <div className="mt-4 text-xs text-center">
                  <p className="font-medium">Medical Information:</p>
                  <p>Scan QR code for medical records</p>
                  <div className="w-16 h-16 mx-auto mt-2 bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR Code</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Download Emergency Card
              </Button>
            </CardFooter>
          </Card>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default EmergencyContacts;
