
import React from "react";
import { Workout } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { fa } from "date-fns/locale";
import { Check, Clock } from "lucide-react";

interface WorkoutListProps {
  workouts: Workout[];
  onWorkoutClick: (workout: Workout) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onWorkoutClick }) => {
  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">هنوز تمرینی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card 
          key={workout.id}
          className="overflow-hidden transition-all duration-200 hover:border-primary cursor-pointer"
          onClick={() => onWorkoutClick(workout)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold">{workout.name}</CardTitle>
              {workout.completed ? (
                <Badge className="flex items-center gap-1" variant="outline">
                  <Check className="h-3 w-3" />
                  کامل شده
                </Badge>
              ) : (
                <Badge className="flex items-center gap-1" variant="outline">
                  <Clock className="h-3 w-3" />
                  در حال انجام
                </Badge>
              )}
            </div>
            <CardDescription>
              {formatDistance(workout.date, new Date(), { 
                addSuffix: true,
                locale: fa 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm">
              {workout.exercises.length} تمرین
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {workout.exercises.slice(0, 3).map((exercise) => (
                <Badge key={exercise.id} variant="secondary">
                  {exercise.id}
                </Badge>
              ))}
              {workout.exercises.length > 3 && (
                <Badge variant="secondary">
                  +{workout.exercises.length - 3}
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default WorkoutList;
