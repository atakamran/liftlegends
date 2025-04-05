
import React from "react";
import { Exercise } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMuscleGroupImage } from "@/data/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onClick }) => {
  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:border-primary cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{exercise.name}</CardTitle>
          <div className="text-2xl">{getMuscleGroupImage(exercise.muscleGroup)}</div>
        </div>
        <CardDescription>
          {exercise.muscleGroup}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {exercise.description}
        </p>
      </CardContent>
      <CardFooter>
        <Badge variant={
          exercise.level === 'مبتدی' ? 'outline' :
          exercise.level === 'متوسط' ? 'secondary' : 'default'
        }>
          {exercise.level}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
