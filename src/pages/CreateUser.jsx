/* eslint-disable */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { users } from "@/atom";

// Define the schema with Zod
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters." }),
    role: z.string().min(1, { message: "Role is required." }),
    userId: z
      .string()
      .min(5, { message: "User ID must be at least 5 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must match the Password." }),
    email: z.string().optional(),
    phone: z.string().optional(),
    emailToggle: z.boolean().default(false),
    phoneToggle: z.boolean().default(false),
    tags: z
      .array(z.string())
      .min(1, { message: "Please add at least one tag." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine(
    (data) =>
      !data.emailToggle ||
      (data.emailToggle && z.string().email().safeParse(data.email).success),
    {
      path: ["email"],
      message: "Please enter a valid email address.",
    }
  )
  .refine(
    (data) =>
      !data.phoneToggle ||
      (data.phoneToggle && z.number().min(10).safeParse(data.phone).success),
    {
      path: ["phone"],
      message: "Please enter a valid phone number.",
    }
  );

// Function to generate a random alphanumeric string
const generateRandomUserId = () => {
  const randomString = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();
  return `US${randomString}`;
};

export function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [userVal, setUserVal] = useAtom(users);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      designation: "",
      userId: generateRandomUserId() ?? "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      emailToggle: false,
      phoneToggle: false,
      tags: [],
    },
  });

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
      setSelectedTag("");
      form.setValue("tags", [...tags, tag]); // Update form value
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    form.setValue("tags", updatedTags); // Update form value
  };

  function onSubmit(data) {
    let input = data;
    const transformedObject = {
      userName: `${input.firstName} ${input.lastName}`,
      profilePic: null, // Assuming there's no profilePic in the input.
      email: input.email || "default_email@example.com", // Default email if empty.
      password: input.password,
      phoneNumber: null, // Assuming there's no phoneNumber in the input.
      createdAt: new Date().toISOString(), // Current date and time.
      accounts: input.tags, // Assuming 'tags' are equivalent to 'accounts'.
      roleId: 3, // This is a static value; you can modify it as needed.
      status: "active", // Assuming a default status of "active".
      user_id: 3, // This is a static value; you can modify it as needed.
      tbl_name: "user", // Assuming the table name is always "user".
      role: input.role,
    };

    setUserVal((prevUsers) => [
      ...prevUsers,
      { id: prevUsers?.[0]?.id + 2, ...transformedObject },
    ]);
    setTags([]);
    setSelectedTag("");
    toast({
      title: "Form Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
  }

  function onClear() {
    form.reset();
  }

  const tgEmail = form.watch("emailToggle");
  const tgPhone = form.watch("phoneToggle");

  return (
    <div className="grow p-8 bg-gray-100 min-h-[100vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Wrap each pair of fields in a div to make them appear side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="">
              <FormField
                control={form.control}
                name="emailToggle"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between mb-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        disabled={!tgEmail}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="phoneToggle"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between mb-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                disabled={!tgPhone}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="tel" placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Card className="w-full p-3 px-1 md:p-3">
            <CardContent className="space-y-4 !px-1 w-full">
              <Label className="block">Select tags</Label>
              <div className="flex w-full items-center space-x-2">
                <Select
                  onValueChange={(value) => setSelectedTag(value)}
                  value={selectedTag}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                  </SelectContent>
                </Select>
                <div
                  className="bg-black border-1 rounded-md text-white px-2 py-1 cursor-pointer dark:bg-dark-bg dark:text-white"
                  onClick={() => {
                    handleAddTag(selectedTag);
                  }}
                >
                  Add
                </div>
              </div>
              {form.formState.errors.tags && (
                <p className="text-red-500 dark:text-red-500">
                  {form.formState.errors.tags.message}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="rounded-full">
                    <span className="ml-2">{tag}</span>
                    <Button
                      variant="ghost"
                      type="button"
                      className="ml-2 rounded-full"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <XIcon />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClear}>
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
