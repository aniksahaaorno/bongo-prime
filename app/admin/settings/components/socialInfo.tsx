"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import {
  Plus,
  Upload,
  Globe,
  MapPin,
  Phone,
  Mail,
  Link,
  Save,
  Loader2,
} from "lucide-react";
import { SOCIAL_OPTIONS } from "./socialOptions";
import { UploadeImage } from "@/app/components/uploadeImage";
import { toast } from "sonner";

type SocialLink = {
  platform: string;
  url: string;
};

type FormValues = {
  logo: FileList;
  name: string;
  phone: string;
  email: string;
  address: string;
  socials: SocialLink[];
};

const BrandForm = ({ brandInfo }: { brandInfo: any }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: brandInfo?.name || "",
      phone: brandInfo?.phone || "",
      email: brandInfo?.email || "",
      address: brandInfo?.address || "",
      socials:
        brandInfo?.socials?.length > 0
          ? brandInfo.socials
          : [{ platform: "facebook", url: "" }],
    },
  });

  useEffect(() => {
    if (brandInfo?.logo) {
      setLogoPreview(brandInfo.logo);
    }

    if (brandInfo) {
      reset({
        name: brandInfo.name || "",
        phone: brandInfo.phone || "",
        email: brandInfo.email || "",
        address: brandInfo.address || "",
        socials:
          brandInfo.socials?.length > 0
            ? brandInfo.socials
            : [{ platform: "facebook", url: "" }],
      });
    }
  }, [brandInfo, reset]);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const handleLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploading(true);
      const url = await UploadeImage(file);
      setLogoPreview(url);
      toast.success("Logo uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload: any = {};

    if (logoPreview) payload.logo = logoPreview;
    if (data.name) payload.name = data.name;
    if (data.phone) payload.phone = data.phone;
    if (data.email) payload.email = data.email;
    if (data.address) payload.address = data.address;

    const validSocials = data.socials?.filter(
      (social) => social.url?.trim() !== "",
    );

    if (validSocials?.length > 0) {
      payload.socials = validSocials;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/social`,
        payload,
      );

      toast.success("Brand information updated successfully!");
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  // Get social icon for platform
  const getSocialIcon = (platform: string) => {
    const social = SOCIAL_OPTIONS.find((s) => s.value === platform);
    return social?.icon || Globe;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Brand Information
        </h1>
        <p className="text-gray-600">
          Manage your brand details and social links
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6"
          >
            {/* Logo Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Brand Logo
                </h2>
                <span className="text-xs text-gray-500">
                  Recommended: 200×200px
                </span>
              </div>

              <div className="flex items-start gap-6">
                {/* Logo Preview */}
                <div className="shrink-0">
                  <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    {logoPreview ? (
                      <>
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain p-4"
                        />
                        <button
                          type="button"
                          onClick={() => setLogoPreview(null)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">
                          Upload logo
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <label
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${uploading ? "bg-gray-100 border-gray-300" : "bg-blue-50 border-blue-200 hover:bg-blue-100"}`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Choose Logo Image
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                      disabled={uploading}
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    Supports JPG, PNG, SVG • Max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border ${errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} focus:ring-2 focus:ring-opacity-20 transition-colors`}
                      placeholder="Enter brand name"
                      {...register("name", {
                        required: "Brand name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border ${errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} focus:ring-2 focus:ring-opacity-20 transition-colors`}
                      placeholder="+880 1XXX XXXXXX"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\s()-]+$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} focus:ring-2 focus:ring-opacity-20 transition-colors`}
                      placeholder="info@brand.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border ${errors.address ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} focus:ring-2 focus:ring-opacity-20 transition-colors`}
                      placeholder="Full address with city and country"
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 10,
                          message: "Please enter a detailed address",
                        },
                      })}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Social Links
                </h2>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => {
                  const Icon = getSocialIcon(field.platform);

                  if (previewMode && !field.url.trim()) return null;

                  return (
                    <div
                      key={field.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* Platform Select */}
                      {!previewMode && (
                        <select
                          className="w-36 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                          {...register(
                            `socials.${index}.platform` as const,
                          )}
                        >
                          {SOCIAL_OPTIONS.map((item) => (
                            <option
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* URL Input */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-500" />
                          {previewMode && (
                            <span className="text-sm font-medium text-gray-700">
                              {
                                SOCIAL_OPTIONS.find(
                                  (s) => s.value === field.platform,
                                )?.label
                              }
                            </span>
                          )}
                        </div>

                        {previewMode ? (
                          <a
                            href={field.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-sm text-blue-600 hover:text-blue-700 truncate"
                          >
                            {field.url}
                          </a>
                        ) : (
                          <input
                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                            placeholder={`Enter ${SOCIAL_OPTIONS.find((s) => s.value === field.platform)?.label} URL`}
                            {...register(
                              `socials.${index}.url` as const,
                            )}
                          />
                        )}
                      </div>

                      {/* Remove Button */}
                      {!previewMode && fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add More Button */}
              {!previewMode && (
                <button
                  type="button"
                  onClick={() =>
                    append({ platform: "facebook", url: "" })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Social Link
                </button>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  {!logoPreview && (
                    <div className="flex items-center gap-2 text-amber-600 text-sm">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      Logo is required
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      reset({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        socials: [{ platform: "facebook", url: "" }],
                      });
                      setLogoPreview(null);
                      toast.info("Form cleared");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !logoPreview}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${!logoPreview || isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Brand Information
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preview
            </h3>

            {/* Brand Preview Card */}
            <div className="space-y-6">
              {/* Logo Preview */}
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Brand logo"
                    className="w-24 h-24 object-contain mb-3"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center mb-3">
                    <Globe className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <p className="text-sm text-gray-600 text-center">
                  {logoPreview
                    ? "Logo Preview"
                    : "Upload logo to see preview"}
                </p>
              </div>

              {/* Contact Info Preview */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">
                      Phone number will appear here
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">
                      Email will appear here
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Address will appear here
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links Preview */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Social Links
                </h4>
                <div className="space-y-2">
                  {fields
                    .filter((field) => field.url.trim())
                    .map((field, index) => {
                      const Icon = getSocialIcon(field.platform);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-600 truncate">
                            {field.url || "No link added"}
                          </span>
                        </div>
                      );
                    })}

                  {fields.filter((field) => field.url.trim())
                    .length === 0 && (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                      No social links added yet
                    </p>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-2">
                  💡 Tips
                </h4>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li>• Use high-quality logo for best display</li>
                  <li>
                    • Include all relevant social media profiles
                  </li>
                  <li>• Keep contact information up to date</li>
                  <li>• Use HTTPS URLs for social links</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
