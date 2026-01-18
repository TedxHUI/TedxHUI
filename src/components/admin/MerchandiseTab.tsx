import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useMediaQuery } from "../../hooks/use-media-query";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  X,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import { Merchandise } from "../../services/merchandiseService";

interface MerchandiseTabProps {
  merchandise: Merchandise[];
  filteredMerchandise: Merchandise[];
  merchSearch: string;
  setMerchSearch: (search: string) => void;
  editingMerch: Merchandise | null;
  newMerch: {
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string;
    image_urls: string[];
  };
  setNewMerch: (merch: {
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string;
    image_urls: string[];
  }) => void;
  isAddingMerch: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
  setSelectedFiles: (files: File[]) => void;
  setImagePreviews: (previews: string[]) => void;
  handleAddMerch: (e: React.FormEvent) => void;
  handleEditMerch: (item: Merchandise) => void;
  handleDeleteMerch: (id: string) => void;
  removeSelectedFile: (index: number) => void;
  cancelEdit: () => void;
}

export const MerchandiseTab: React.FC<MerchandiseTabProps> = ({
  merchandise,
  filteredMerchandise,
  merchSearch,
  setMerchSearch,
  editingMerch,
  newMerch,
  setNewMerch,
  isAddingMerch,
  isDialogOpen,
  setIsDialogOpen,
  handleFileChange,
  imagePreviews,
  setSelectedFiles,
  setImagePreviews,
  handleAddMerch,
  handleEditMerch,
  handleDeleteMerch,
  removeSelectedFile,
  cancelEdit,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const MerchForm = () => (
    <form onSubmit={handleAddMerch} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Item Name</label>
          <Input
            placeholder="e.g. TEDxHUI T-Shirt"
            value={newMerch.name}
            onChange={(e) => setNewMerch({ ...newMerch, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (₦)</label>
          <Input
            type="number"
            placeholder="0"
            value={newMerch.price}
            onChange={(e) =>
              setNewMerch({
                ...newMerch,
                price: parseInt(e.target.value),
              })
            }
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          placeholder="Item description..."
          value={newMerch.description}
          onChange={(e) =>
            setNewMerch({
              ...newMerch,
              description: e.target.value,
            })
          }
          required
          className="min-h-[100px] resize-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <Input
            type="number"
            placeholder="0"
            value={newMerch.stock_quantity}
            onChange={(e) =>
              setNewMerch({
                ...newMerch,
                stock_quantity: parseInt(e.target.value),
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Images</label>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="cursor-pointer pr-10"
              />
              <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Existing and New Previews */}
            <div className="flex flex-wrap gap-2">
              {/* Existing Images */}
              {newMerch.image_urls?.map((url, idx) => (
                <div
                  key={`existing-${idx}`}
                  className="relative w-16 h-16 border rounded-lg overflow-hidden group"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = newMerch.image_urls.filter(
                        (_, i) => i !== idx,
                      );
                      setNewMerch({ ...newMerch, image_urls: updated });
                    }}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* New File Previews */}
              {imagePreviews.map((preview, idx) => (
                <div
                  key={`new-${idx}`}
                  className="relative w-16 h-16 border-2 border-primary/20 rounded-lg overflow-hidden group"
                >
                  <img
                    src={preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-[8px] text-white px-1 font-bold">
                    NEW
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(idx)}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t mt-4">
        <Button type="button" variant="outline" onClick={cancelEdit}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isAddingMerch}
          className="min-w-[120px]"
        >
          {isAddingMerch
            ? "Saving..."
            : editingMerch
              ? "Update Item"
              : "Add Item"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search merchandise..."
            className="pl-10"
            value={merchSearch}
            onChange={(e) => setMerchSearch(e.target.value)}
          />
        </div>

        {isDesktop ? (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => !open && cancelEdit()}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2 rounded-full px-6"
              >
                <Plus className="w-4 h-4" />
                Add Merchandise
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] border-none rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {editingMerch ? "Edit Merchandise" : "Add New Merchandise"}
                </DialogTitle>
                <DialogDescription>
                  {editingMerch
                    ? "Update the details of your existing product."
                    : "Fill in the details to add a new product to your store."}
                </DialogDescription>
              </DialogHeader>
              <MerchForm />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer
            open={isDialogOpen}
            onOpenChange={(open) => !open && cancelEdit()}
          >
            <DrawerTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2 rounded-full w-full"
              >
                <Plus className="w-4 h-4" />
                Add Merchandise
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <div className="px-6 pb-8 overflow-y-auto">
                <DrawerHeader className="px-0">
                  <DrawerTitle className="text-xl font-bold">
                    {editingMerch ? "Edit Merchandise" : "Add New Merchandise"}
                  </DrawerTitle>
                  <DrawerDescription>
                    {editingMerch
                      ? "Update the product details below."
                      : "Add a new product to your inventory."}
                  </DrawerDescription>
                </DrawerHeader>
                <MerchForm />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>
            View and manage your existing merchandise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {filteredMerchandise.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white border rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden border bg-gray-50 flex-shrink-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="font-bold text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          ₦{item.price.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          Stock: {item.stock_quantity}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleEditMerch(item)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteMerch(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredMerchandise.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>
                  {merchSearch
                    ? "No products match your search."
                    : "No merchandise added yet."}
                </p>
                {merchSearch && (
                  <Button
                    variant="link"
                    onClick={() => setMerchSearch("")}
                    className="mt-2 text-primary"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
