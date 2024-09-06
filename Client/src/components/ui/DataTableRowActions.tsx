"use client"

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {Button} from "./button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    //DropdownMenuSeparator,
    DropdownMenuLabel,
} from "./dropdown-menu"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit: (value: TData) => void;
    onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData, >({row, onEdit, onDelete}: DataTableRowActionsProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(row.original)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DataTableRowActions;