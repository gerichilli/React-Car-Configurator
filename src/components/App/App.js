import React from 'react';
import {
  colors,
  interiorColors,
  interiorLayouts,
  models,
  initialConfig
} from '../../data';
// Styles
import './App.css';
// Components
import Menu from '../Menu';
import Footer from '../Footer';

class App extends React.Component {
  state = {
    currentStep: 0,
    config: null,
    totalPrice: 0
  };

  steps = [
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
        },
        {
          label: "Select type",
          type: "text",
          prop: "car_type",
          options: this.selectedModel?.types ?? [],
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
          options: this.selectedModel?.colors ?? []
        },
        {
          label: "Select wheels",
          type: "image",
          prop: "wheels",
          options: this.selectedModel?.wheels ?? []
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
          options: this.selectedModel?.interiorColors ?? []
        },
        {
          label: "Select interior layout",
          type: "text",
          prop: "interior_layout",
          options: this.selectedModel?.interiorLayouts ?? []
        },
      ]
    },
    {
      name: "summary"
    }
  ];

  goToStep = (step) => {
    this.setState({ currentStep: step });
  };

  goToPrevStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep > 0
        ? prevState.currentStep-1
        : prevState.currentStep
    }));
  };

  goToNextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep < this.steps.length - 1
        ? prevState.currentStep+1
        : prevState.currentStep
    }));
  };

  render() {
    const selectedModel = models.find(model =>
      model?.key === this.state.config?.model
    );

    const isFirstStep = this.state.currentStep === 0;
    const isLastStep = this.state.currentStep === this.steps.length - 1;

    return (
      <div className="app">
        <Menu
          items={this.steps.map(step => step.name)}
          selectedItem={this.state.currentStep}
          onSelectItem={this.goToStep}
        />
        <main className="app-content" />
        <Footer
          totalPrice={this.state.totalPrice}
          disablePrev={isFirstStep}
          disableNext={isLastStep}
          onClickPrev={this.goToPrevStep}
          onClickNext={this.goToNextStep}
        />
      </div>
    );
  };
};

export default App;