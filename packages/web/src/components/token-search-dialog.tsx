"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";

export function TokenSearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-50">
          <div className="flex gap-2">
            <IoIosSearch />
            <span>Search Tokens...</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Search Tokens...</DialogTitle>
        <div className="flex flex-col">
          <Input />
        </div>
      </DialogContent>
    </Dialog>
  );
}
