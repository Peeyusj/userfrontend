/* eslint-disable */
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InboundPermissions from "@/components/InboundPermissions";
import OutboundPermissions from "@/components/OutboundPermissions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { role } from "@/atom";
import { useAtom } from "jotai";

const AccessManagement = () => {
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState({
    purchaseOrder: {
      create: false,
      view: false,
      generatePrintUIDs: false,
    },
    asn: {
      create: false,
      view: true,
      delete: false,
      update: false,
      generatePrintUIDs: false,
    },
    gateEntry: {
      create: false,
      view: true,
      deleteDoc: false,
      editDocUpload: false,
      shortClose: false,
    },
    grn: {
      create: false,
      view: true,
    },
    stickering: false,
    putaway: {
      create: false,
      view: true,
    },
  });

  const [selectedOutboundPermissions, setSelectedOutboundPermissions] =
    useState({
      salesOrder: {
        createUpload: false,
        reConfirm: false,
        cancel: false,
        courierReAssign: false,
        updateAddress: false,
      },
      pick: {
        create: false,
        view: true,
        unassign: false,
      },
      pack: {
        b2cPack: false,
        viewInvoice: true,
        b2bPack: false,
        invoicing: false,
      },
      handover: {
        create: false,
        view: true,
      },
      manifest: {
        create: false,
        view: true,
        markShip: false,
      },
    });

  const [roleName, setRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roleVal, setRoleVal] = useAtom(role);

  const handleSubmit = async () => {
    if (!roleName) {
      toast({
        variant: "destructive",
        title: "Role name not provided",
      });
      return;
    }
    try {
      setIsLoading(true);
      setRoleVal({
        tbl_name: "role",
        role: roleName,
        createdAt: new Date(),
        status: "active",
        createdBy: 102,
      });
      console.log({
        access: {
          inbound: selectedPermissions,
          outbound: selectedOutboundPermissions,
        },
      });
      toast({
        title: "Form Submitted Check log for full detail",
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-md">
      {isLoading ? (
        <div
          style={{
            maxHeight: "100px",
            marginTop: "-170px",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <div className="bg-gray-200 p-8 rounded-md ">
            <Label>Role Name</Label>
            <Input
              className="w-64"
              onChange={(e) => {
                setRoleName(e.target.value);
              }}
            />
          </div>
          <Carousel className="w-full max-w-full mx-auto">
            <CarouselContent>
              <CarouselItem key={"1"}>
                <div className="p-1">
                  <InboundPermissions
                    selectedPermissions={selectedPermissions}
                    setSelectedPermissions={setSelectedPermissions}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </CarouselItem>
              <CarouselItem key={"2"}>
                <div className="p-1">
                  <OutboundPermissions
                    selectedPermissions={selectedOutboundPermissions}
                    setSelectedPermissions={setSelectedOutboundPermissions}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="absolute bottom-6 right-2 flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </>
      )}
    </div>
  );
};

export default AccessManagement;
