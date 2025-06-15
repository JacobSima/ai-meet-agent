import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const UseConfirm = (
  title: string,
  description: string): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null);

  const confirm = () => new Promise(resolve => setPromise({ resolve }));
  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const confirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="lg:auto"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          className="lg:auto"
        >
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [confirmationDialog, confirm];
};
