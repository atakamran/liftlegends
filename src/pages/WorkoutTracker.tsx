
import React, { useState } from "react";
import { Plus, Save, X } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exercises } from "@/data/exercises";
import { Exercise, WorkoutSet, WorkoutExercise } from "@/types";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

const WorkoutTracker = () => {
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState("تمرین جدید");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  const handleAddExercise = () => {
    if (!selectedExerciseId) return;

    const exercise = exercises.find((e) => e.id === selectedExerciseId);
    if (!exercise) return;

    const newWorkoutExercise: WorkoutExercise = {
      id: uuidv4(),
      exerciseId: selectedExerciseId,
      sets: [
        {
          id: uuidv4(),
          exerciseId: selectedExerciseId,
          weight: 0,
          reps: 0,
          completed: false,
        },
      ],
    };

    setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
    setSelectedExerciseId("");
  };

  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = [...workoutExercises];
    const exercise = updatedExercises[exerciseIndex];

    if (!exercise) return;

    exercise.sets.push({
      id: uuidv4(),
      exerciseId: exercise.exerciseId,
      weight: exercise.sets[exercise.sets.length - 1]?.weight || 0,
      reps: exercise.sets[exercise.sets.length - 1]?.reps || 0,
      completed: false,
    });

    setWorkoutExercises(updatedExercises);
  };

  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises.splice(exerciseIndex, 1);
    setWorkoutExercises(updatedExercises);
  };

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: any
  ) => {
    const updatedExercises = [...workoutExercises];
    const exercise = updatedExercises[exerciseIndex];
    
    if (!exercise) return;
    
    const set = exercise.sets[setIndex];
    if (!set) return;

    if (field === "weight" || field === "reps") {
      set[field] = Number(value);
    } else {
      set[field] = value;
    }

    setWorkoutExercises(updatedExercises);
  };

  const handleSaveWorkout = () => {
    const workout = {
      id: uuidv4(),
      name: workoutName,
      date: new Date(),
      exercises: workoutExercises,
      completed: false,
    };

    // In a real app, this would save to a database
    console.log("Saving workout:", workout);
    
    toast({
      title: "تمرین ذخیره شد",
      description: "جزئیات تمرین شما با موفقیت ذخیره شد.",
    });

    // Reset the form
    setWorkoutName("تمرین جدید");
    setWorkoutExercises([]);
  };

  const getExerciseName = (exerciseId: string) => {
    return exercises.find((e) => e.id === exerciseId)?.name || "تمرین";
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ثبت تمرین</h1>
        <Button onClick={handleSaveWorkout} disabled={workoutExercises.length === 0}>
          <Save className="ml-2 h-4 w-4" />
          ذخیره تمرین
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>اطلاعات تمرین</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="workout-name">نام تمرین</Label>
              <Input
                id="workout-name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="exercise-select">افزودن تمرین</Label>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Select value={selectedExerciseId} onValueChange={setSelectedExerciseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب تمرین" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map((exercise) => (
                      <SelectItem key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddExercise} disabled={!selectedExerciseId}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {workoutExercises.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">برای شروع، تمرینی به برنامه خود اضافه کنید.</p>
        </div>
      ) : (
        workoutExercises.map((workoutExercise, exerciseIndex) => (
          <Card key={workoutExercise.id} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{getExerciseName(workoutExercise.exerciseId)}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExercise(exerciseIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 font-medium">
                  <div className="col-span-1">#</div>
                  <div className="col-span-4">وزن (kg)</div>
                  <div className="col-span-4">تکرار</div>
                  <div className="col-span-3">انجام شد</div>
                </div>
                {workoutExercise.sets.map((set, setIndex) => (
                  <div key={set.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-1">{setIndex + 1}</div>
                    <div className="col-span-4">
                      <Input
                        type="number"
                        value={set.weight || ""}
                        onChange={(e) =>
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "weight",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "reps",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <Checkbox
                        checked={set.completed}
                        onCheckedChange={(checked) =>
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "completed",
                            checked
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAddSet(exerciseIndex)}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  ست جدید
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </AppLayout>
  );
};

export default WorkoutTracker;
