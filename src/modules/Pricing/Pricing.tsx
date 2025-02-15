import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

const Pricing = () => {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <div className="flex flex-col mt-[100px]">
        <h1 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>For individuals getting started</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">Free</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />1 Chatbot
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Basic features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Community support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="flex flex-col border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Premium</CardTitle>
              <CardDescription>For growing businesses</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                $29<span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Up to 3 Chatbots
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Advanced features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Analytics dashboard
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large-scale operations</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Unlimited Chatbots
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Custom features
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  SLA & advanced security
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
