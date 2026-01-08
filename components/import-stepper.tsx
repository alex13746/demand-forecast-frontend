import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ImportStepperProps {
  currentStep: number
}

const steps = [
  { number: 1, label: "Загрузка" },
  { number: 2, label: "Настройка полей" },
  { number: 3, label: "Обработка AI" },
]

export function ImportStepper({ currentStep }: ImportStepperProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step.number < currentStep && "bg-primary text-primary-foreground",
                  step.number === currentStep && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  step.number > currentStep && "bg-muted text-muted-foreground border-2 border-border",
                )}
              >
                {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <div
                className={cn(
                  "mt-2 text-sm font-medium text-center",
                  step.number <= currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 mx-4 mb-6", step.number < currentStep ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
