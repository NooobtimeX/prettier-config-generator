"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function GeneratedModal({
  open,
  config,
  onClose,
}: {
  open: boolean;
  config: string;
  onClose: () => void;
}) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(config);
  };

  const downloadFile = () => {
    const blob = new Blob([config], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".prettierrc";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generated Prettier Config</DialogTitle>
        </DialogHeader>
        <Textarea
          readOnly
          className="min-h-[200px] font-mono text-sm"
          value={config}
        />
        <div className="flex gap-2 justify-end flex-wrap">
          <Button variant="outline" onClick={copyToClipboard}>
            Copy to clipboard
          </Button>
          <Button variant="outline" onClick={downloadFile}>
            Download as .prettierrc
          </Button>
          <Button onClick={onClose} className="text-white">
            Generate new
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
