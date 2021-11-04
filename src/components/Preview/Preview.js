import React from 'react';
import PropTypes from 'prop-types';
// Styles
import './Preview.css';
// Components
import Slideshow from '../Slideshow';

/*
 * TODO: Refactor Preview as a functional component
 *
 * Requirements:
 * - Use React hooks if necessary
 * - Use function closures instead of this for callbacks and event handlers
 * - Preview logic and behavior should remain the same
 * 
 */ 

const Preview = ({ config, models, showAllModels, showSpecs, onChangeModel }) => {
  const index = models.findIndex(model => 
    model.key === config?.model
  );

  const items = models.map(model => ({
    alt: model.name,
    url: `${process.env.PUBLIC_URL}/cars/model_${model.key}/model_${model.key}_${config.color}_${config.wheels}.png`,
    scale: ['x'].includes(model.key)
  }));

  const selectedModel = models.find(model =>
    model.key === config.model
  );

  const selectedType = selectedModel?.types?.find(type =>
    type.value === config.car_type
  );

  const specs = selectedType?.specs;

  const handleOnClickPrev = () => {
    const newIndex = index > 0
      ? index - 1
      : models.length - 1;
    onChangeModel(models?.[newIndex]?.key);
  };

  const handleOnClickNext = () => {
    const newIndex = index < models.length - 1
      ? index + 1
      : 0;
    onChangeModel(models?.[newIndex]?.key);
  };

  return (
    <div className="preview">
        <Slideshow
          items={items}
          index={index}
          showPrev={showAllModels}
          showNext={showAllModels}
          onClickPrev={handleOnClickPrev}
          onClickNext={handleOnClickNext}
        />
        {
          showSpecs ? (
            <ul className="specs">
              <li>
                <span className="specs-value">{specs?.range ?? ' - '}mi</span>
                <span className="specs-label">Range (EPA est.)</span>
              </li>
              <li>
                <span className="specs-value">{specs?.top_speed ?? ' - '}mph</span>
                <span className="specs-label">Top Speed</span>
              </li>
              <li>
                <span className="specs-value">{specs?.acceleration_time ?? ' - '}s</span>
                <span className="specs-label">0-60 mph</span>
              </li>
            </ul>
          ) : null
        }
      </div>
  )
}

Preview.propTypes = {
  config: PropTypes.object,
  models: PropTypes.array,
  showAllModels: PropTypes.bool,
  showSpecs: PropTypes.bool,
  onChangeModel: PropTypes.func
};

export default Preview;
