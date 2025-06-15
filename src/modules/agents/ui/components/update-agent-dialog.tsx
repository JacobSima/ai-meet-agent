"use client";

import { AgentGetOne } from "../../types";
import { AgentForm } from "./agent-form";
import { ResponsiveDialog } from "@/components/responsive-dialog";

interface Props {
  open: boolean,
  initialValues: AgentGetOne,
  onOpenChange: ((open: boolean) => void),
};

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
