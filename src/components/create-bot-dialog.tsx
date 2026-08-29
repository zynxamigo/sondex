import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateBotDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (input: { name: string; description: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova sonda</DialogTitle>
          <DialogDescription>
            Montamos o casco com um bot Discord.js pronto para o Eco.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!name.trim()) return;
            setBusy(true);
            try {
              await onCreate({ name: name.trim(), description: description.trim() });
              setName("");
              setDescription("");
              onOpenChange(false);
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="bot-name">Nome</Label>
            <Input
              id="bot-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sonda Norte"
              maxLength={48}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bot-desc">Notas</Label>
            <Textarea
              id="bot-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="O que esta sonda faz"
              maxLength={180}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={busy || !name.trim()}>
              Montar casco
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
