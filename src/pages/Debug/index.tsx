import React from "react";
import { FormSwitch, FormCheck } from "@/components/Base/Form";

function Debug() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Debug Page - Input Components Test
      </h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-3">FormSwitch.Input Test</h2>
          <FormSwitch className="flex items-center">
            <FormSwitch.Label htmlFor="debug-switch-1">
              Test Switch Label
            </FormSwitch.Label>
            <FormSwitch.Input
              id="debug-switch-1"
              className="ml-3"
              type="checkbox"
            />
          </FormSwitch>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">FormCheck.Input Test</h2>
          <FormCheck className="flex items-center">
            <FormCheck.Input id="debug-check-1" type="checkbox" />
            <FormCheck.Label htmlFor="debug-check-1" className="ml-2">
              Test Checkbox Label
            </FormCheck.Label>
          </FormCheck>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">Status</h2>
          <p className="text-green-600">
            ✅ If you can see this page without console errors, the input
            element fix is working!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Debug;
