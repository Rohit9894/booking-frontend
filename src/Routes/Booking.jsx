import { SelectVehicle } from "@/components/SelectVehicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { CircleChevronLeft, MoveLeft } from "lucide-react";
import React, { useState } from "react";
const initState = {
  customerFirstName: "",
  customerLastName: "",
  startDate: "",
  endDate: "",
  vehicleId: "",
  wheels: "2",
};
const Booking = () => {
  const [active, setActive] = useState("name");
  const [formState, setFormState] = useState(initState);

  async function handleSubmt(e) {
    e.preventDefault();

    if (active == "name") {
      setActive("type");
    } else if (active == "type") {
      setActive("vehicle");
    } else if (active == "vehicle") {
      setActive("date");
    } else if (active == "date") {
      delete formState.wheels;
      delete formState.type;
      const date1 = new Date(formState.startDate);
      const date2 = new Date(formState.endDate);
      
      if (date1.getTime() > date2.getTime()) {
        return toast({
          title: "End Date must be grater than Start Date",
          description: "",
        });
      } 
      try {
        const res = await axios.post(
          "http://localhost:3000/booking",
          formState
        );
        console.log(res?.data?.message);
        if (res?.data?.message == "Booking successful!") {
          toast({
            title: "Booking successful!",
            description: "",
          });
        }
      } catch (error) {
        if (
          error?.response?.data?.error ===
          "Vehicle already booked for the selected dates"
        ) {
          toast({
            title: "Vehicle already booked for the selected dates",
            description: "",
          });
        } else {
          toast({
            title: "server error",
            description: "",
          });
        }
      }
    }
  }

  async function handleBack() {
    if (active == "name") {
      setActive("name");
    } else if (active == "type") {
      setActive("name");
    } else if (active == "vehicle") {
      setActive("type");
    } else if (active == "date") {
      setActive("vehicle");
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  return (
    <div className="flex container w-screen min-h-screen items-center justify-center bg-gray-300">
      <div>
        <div onClick={handleBack} className="mb-6 cursor-pointer">
          <Button className="flex gap-2" disabled={active === "name"}>
            {" "}
            <CircleChevronLeft />
            Back
          </Button>
        </div>
        <form
          onSubmit={handleSubmt}
          className="w-full md:w-[500px] shadow-custom p-8 bg-white"
        >
          {/* Name */}
          {active == "name" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl">First, What's your name ?</h1>
              <div>
                <Label className="cursor-pointer" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  onChange={handleChange}
                  name={"customerFirstName"}
                  required
                />
              </div>
              <div>
                <Label className="cursor-pointer" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  onChange={handleChange}
                  name={"customerLastName"}
                  required
                />
              </div>
            </div>
          )}
          {active == "type" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl">Please Select Type</h1>
              <div className="flex gap-8">
                <div>
                  <Input
                    onChange={handleChange}
                    className="size-5"
                    value={"4"}
                    type="radio"
                    name="type"
                  />
                  <Label>Bike</Label>
                </div>
                <div>
                  <Input
                    onChange={handleChange}
                    className="size-5"
                    type="radio"
                    value={"2"}
                    name="type"
                  />
                  <Label>Car</Label>
                </div>
              </div>
            </div>
          )}
          {active == "vehicle" && (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl">Please Select Vehicle</h1>
              <div className="flex flex-col gap-4">
                <SelectVehicle
                  handleChange={handleChange}
                  wheels={formState?.wheels}
                />
              </div>
            </div>
          )}
          {active == "date" && (
            <div className="flex flex-col gap-4 justify-between">
              <h1 className="text-4xl">Select Date</h1>
              <div className="flex justify-between gap-8">
                <div className="!cursor-pointer">
                  <Label htmlFor="start" className="cursor-pointer">
                    Start Date
                  </Label>
                  <input
                    className="size-5 cursor-pointer input-style"
                    type="date"
                    onChange={handleChange}
                    name="startDate"
                    required
                    id="start"
                  />
                </div>
                <div>
                  <Label htmlFor="end" className="cursor-pointer">
                    End Date
                  </Label>
                  <input
                    className="size-5 cursor-pointer input-style"
                    type="date"
                    onChange={handleChange}
                    name="endDate"
                    required
                    id="end"
                  />
                </div>
              </div>
            </div>
          )}
          <Button type="submit" className="w-full mt-4">
            {active == "date" ? "Submit" : "Next"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
