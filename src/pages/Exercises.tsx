
import React, { useState } from "react";
import { Search } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import { Input } from "@/components/ui/input";
import { exercises } from "@/data/exercises";
import ExerciseCard from "@/components/workout/ExerciseCard";
import { MuscleGroup, Exercise } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdvisorChat from "@/components/workout/AdvisorChat";

const muscleGroups: MuscleGroup[] = [
  'کل بدن',
  'سینه',
  'پشت',
  'شانه',
  'پا',
  'بازو',
  'شکم',
];

const ExercisesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<MuscleGroup | "همه">("همه");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "همه" || exercise.muscleGroup === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">کتابخانه تمرین‌ها</h1>

      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="جستجوی تمرین..."
          className="pl-3 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="همه" value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <TabsList className="mb-6 w-full overflow-x-auto flex-nowrap">
          <TabsTrigger value="همه">همه</TabsTrigger>
          {muscleGroups.map((group) => (
            <TabsTrigger key={group} value={group}>
              {group}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTab} className="mt-0">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">تمرینی یافت نشد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard 
                  key={exercise.id} 
                  exercise={exercise} 
                  onClick={() => setSelectedExercise(exercise)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        {selectedExercise && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedExercise.name}</DialogTitle>
              <DialogDescription>{selectedExercise.muscleGroup} - {selectedExercise.level}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>{selectedExercise.description}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Add the AdvisorChat component */}
      <AdvisorChat />
    </AppLayout>
  );
};

export default ExercisesPage;
