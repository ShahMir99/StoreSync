"use client"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const CellActions = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast({
      variant : "success",
      title : "Id copied successfully",
    })
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${params.storeId}/signboards/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/signboards`);
      toast({
        variant : "success",
        title: "Signboard Delete.",
      });
    } catch (err) {
      console.log(err)
      toast({
        variant : "destructive",
        title: "Deletion Failed",
        description : "Please removed all category using this signboars first"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 outline-none  border-none"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className="hover:bg-blue-50"
        >
          <Copy className="mr-2 w-4 h-4" />
          Copy id
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-blue-50"
          onClick={() =>
            router.push(`/${params.storeId}/signboards/${data.id}`)
          }
        >
          <Edit className="mr-2 w-4 h-4" />
          update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="hover:bg-blue-50">
          <Trash className="mr-2 w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
