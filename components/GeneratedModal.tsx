"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";

export function GeneratedModal({
  open,
  config,
  onClose,
}: {
  open: boolean;
  config: string;
  onClose: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(config);
  };

  const Content = (
    <>
      <div className="rounded-md overflow-auto max-h-[300px]">
        <SyntaxHighlighter
          language="json"
          style={atomDark}
          customStyle={{ fontSize: "0.875rem", borderRadius: "0.375rem" }}
        >
          {config}
        </SyntaxHighlighter>
      </div>

      <p className="text-sm text-muted-foreground text-center mb-1">
        Copy and paste this into <code>.prettierrc</code> file.
      </p>

      <div className="flex gap-2 justify-end flex-wrap">
        <Button variant="outline" onClick={copyToClipboard}>
          Copy to clipboard
        </Button>
      </div>
    </>
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">
            Generated Prettier Config
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{Content}</div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Generated Prettier Config
          </DialogTitle>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
}
