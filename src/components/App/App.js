import React, { useEffect, useState } from 'react';
import { models, initialConfig } from '../../data';
// Styles
import './App.css';
// Components
import Menu from '../Menu';
import Footer from '../Footer';
import Settings from '../Settings';
import Summary from '../Summary';
import Preview from '../Preview';
import InteriorPreview from '../InteriorPreview';
import UseLocalStorage from '../../hooks/UseLocalStorage';

/*
 * TODO: Refactor App as a functional component OK
 *
 * Requirements:
 * - Compute total price using React hooks only when config or selectedModel change OK
 * - Create a custom hook to use localStorage to store the current step and config
 * - Switch from setState to the useLocalStorage hook
 * - Use function closures instead of this for callbacks and event handlers OK
 * - App logic and behavior should remain the same Ok
 * 
 */ 

function App() {
  const {data: currentStep, setData: setCurrentStep} = UseLocalStorage("current_step", 0);
  const {data: config, setData: setConfig} = UseLocalStorage("config", initialConfig['s'] ?? null);
  const [totalPrice, setTotalPrice] = useState(0);
  // From current config, get current modal by key like "x", "s", "y"
  const selectedModel = models.find(model =>
    model?.key === config?.model
  );

  const steps = [
      {
        name: "car",
        settings: [
          {
            label: "Select car",
            type: "text",
            prop: "model",
            options: models.map(model => ({
              value: model.key,
              label: model.name
            }))
            // Object like
            /* options: [
              {
                value: "s",
                label: "Model S"
              },
              {
                value: "x",
                label: "Model X"
              },
              {
                value: "y",
                label: "Model Y"
              }
            ]
            */
          },
          {
            label: "Select type",
            type: "text",
            prop: "car_type",
            options: selectedModel?.types ?? [],
            // Object like
            /*
              options: [
                {
                  label: "Long Range Plus",
                  value: "long_range_plus",
                  specs: {
                    range: 402,
                    top_speed: 155,
                    acceleration_time: 3.7,
                  },
                  price: 69420
                },
                {
                  label: "Performance",
                  value: "performance",
                  specs: {
                    range: 387,
                    top_speed: 163,
                    acceleration_time: 2.3,
                  },
                  price: 91990,
                  benefits: [
                    "Quicker acceleration: 0-60 mph in 2.3s",
                    "Ludicrous Mode",
                    "Enhanced Interior Styling",
                    "Carbon fiber spoiler"
                  ]
                },
                {
                  label: "Plaid",
                  value: "plaid",
                  specs: {
                    range: 520,
                    top_speed: 200,
                    acceleration_time: 2.0,
                  },
                  price: 139990,
                  benefits: [
                    "Quickest 0-60 mph and quarter mile acceleration of any production car ever",
                    "Acceleration from 0-60 mph: <2.0s",
                    "Quarter mile: <9.0s",
                    "1,100+ horsepower",
                    "Tri Motor All-Wheel Drive"
                  ]
                },
              ],
            */
            disclaimer_1: "All cars have Dual Motor All-Wheel Drive, adaptive air suspension, premium interior and sound.",
            disclaimer_2: "Tesla All-Wheel Drive has two independent motors that digitally control torque to the front and rear wheels—for far better handling and traction control. Your car can drive on either motor, so you don't need to worry about getting stuck on the road."
          }
        ]
      },
      {
        name: "exterior",
        settings: [
          {
            label: "Select color",
            type: "color",
            prop: "color",
            options: selectedModel?.colors ?? []
          },
          /*
          options: [
            { label: "Pearl White Multi-Coat", value: "white", price: 0 },
            { label: "Solid Black", value: "black", price: 1500 },
            { label: "Midnight Silver Metallic", value: "silver", price: 1500 },
            { label: "Deep Blue Metallic", value: "blue", price: 1500 },
            { label: "Red Multi-Coat", value: "red", price: 2500 }
          ];
          */
          {
            label: "Select wheels",
            type: "image",
            prop: "wheels",
            options: selectedModel?.wheels ?? []
          /*
          options: [
            {
              src: `${process.env.PUBLIC_URL}/wheels/model_s/model_s_wheel_1.png`,
              label: '19" Tempest Wheels',
              value: "wheel_1",
              price: 0
            },
            {
              src: `${process.env.PUBLIC_URL}/wheels/model_s/model_s_wheel_2.png`,
              label: '21" Sonic Carbon Twin Turbine Wheels',
              value: "wheel_2",
              price: 4500
            }
          ],
          */
          }
        ]
      },
      {
        name: "interior",
        settings: [
          {
            label: "Select premium interior",
            type: "text",
            prop: "interior_color",
            options: selectedModel?.interiorColors ?? []
          },
          {
            label: "Select interior layout",
            type: "text",
            prop: "interior_layout",
            options: selectedModel?.interiorLayouts ?? []
          },
          /*
          options: [
            { label: "Five seat interior", value: "five_seat", price: 0 },
            { label: "Six seat interior", value: "six_seat", price: 6500 },
            { label: "Seven seat interior", value: "seven_seat", price: 3500 },
          ];
          */
        ]
      },
      {
        name: "summary"
      }
  ];

  useEffect(() => {
    const basePrice = selectedModel?.types?.find(
      type => type.value === config?.car_type
    )?.price ?? 0;
    const colorPrice = selectedModel?.colors?.find(
      color => color.value === config?.color
    )?.price ?? 0;
    const wheelsPrice = selectedModel?.wheels?.find(
      wheels => wheels.value === config?.wheels
    )?.price ?? 0;
    const interiorColorPrice = selectedModel?.interiorColors?.find(
      interiorColor => interiorColor.value === config?.interior_color
    )?.price ?? 0;
    const interiorLayoutPrice = selectedModel?.interiorLayouts?.find(
      interiorLayout => interiorLayout.value === config?.interior_layout
    )?.price ?? 0;

    setTotalPrice(basePrice + colorPrice + wheelsPrice + interiorColorPrice + interiorLayoutPrice) 
  }, [config, selectedModel]) 

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => {
      const newStep = prevStep > 0 ? prevStep - 1 : prevStep;
      return newStep;
    });
  };

  const goToNextStep = () => {
    setCurrentStep(prevStep => {
      const newStep = prevStep < steps.length - 1 ? prevStep + 1 : prevStep;
      return newStep;
    });
  };

  const handleChangeModel = (model) => {
    setConfig(initialConfig[model]);
  };

  const handleOnSelectOption = (prop, value) => {
    if (prop === "model") {
      handleChangeModel(value);
    }
    else {
      setConfig(prevState => ({
        ...prevState,
          [prop]: value
      }));
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="app">
      <Menu
        items={steps.map(step => step.name)}
        selectedItem={currentStep}
        onSelectItem={goToStep}
      />
      <main className="app-content">
        {
          steps[currentStep]?.name === "interior" ? (
            <InteriorPreview
              interior={selectedModel?.interiorColors.find(
                interiorColor => interiorColor.value === config.interior_color
              )}
            />
          ) : (
            <Preview
              config={config}
              models={models}
              showAllModels={isFirstStep}
              showSpecs={!isLastStep}
              onChangeModel={handleChangeModel}
            />
          )
        }
        {
        isLastStep ? (
          <Summary
            config={config}
            models={models}
            totalPrice={totalPrice}
          />
        ) : (
          <Settings
            config={config}
            settings={steps[currentStep].settings}
            onSelectOption={handleOnSelectOption}
          />
        )
      }
      </main>
      <Footer
        totalPrice={totalPrice}
        disablePrev={isFirstStep}
        disableNext={isLastStep}
        onClickPrev={goToPrevStep}
        onClickNext={goToNextStep}
      />
    </div>
  );
}

export default App;
