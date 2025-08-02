import { createPortal } from "react-dom";
import { Mask } from "./Mask";
import { TooltipPlacement } from "antd/es/tooltip";
import { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import './index.scss'
export interface onBoardingStepConfig {
  selector: () => HTMLElement | null;
  placement?: TooltipPlacement;
  renderContent:(step:number)=>React.ReactNode;
  beforeForward?: (step: number) => void;
  beforeBack?: (step: number) => void;
}

export interface onBoardingStep {
  step?: number;
  steps: onBoardingStepConfig[];
  getContainer?: () => HTMLElement;
  onStepsEnd?: () => void;
}

export function OnBoarding(props: onBoardingStep) {
  const { step = 0, steps, getContainer, onStepsEnd } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const currentElement = steps[currentStep]?.selector();
  const currentContainerElement = getContainer?.() || document.documentElement;
  const [done,setDone] = useState(false);
  const getCurrentObj = ()=> {
    return steps?.[currentStep]
  }
  const go = ()=>{
    if(currentStep===steps.length-1) {
      setDone(true);
      onStepsEnd?.();
      return;
    }
    getCurrentObj()?.beforeForward?.(currentStep);
    setCurrentStep(currentStep+1);
  }
  const back = ()=>{
     if(currentStep===0) {
      return;
    }
    getCurrentObj()?.beforeBack?.(currentStep);
    setCurrentStep(currentStep-1);
  }
  useEffect(()=>{
    setCurrentStep(step!);
  },[step])

  const renderPopover = (wrapper: React.ReactNode)=>{
    const config = getCurrentObj();
    if (!config) {
      return wrapper;
    }
    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;
    const operation = (
      <div className={'onboarding-operation'}>
        {
          currentStep !== 0 && 
            <Button
                className={'back'}
                onClick={() => back()}>
                {'上一步'}
            </Button>
        }
        <Button
          className={'forward'}
          type={'primary'}
          onClick={() => go()}>
          {currentStep === steps.length - 1 ? '我知道了' : '下一步'}
        </Button>
      </div>
    );
    return <Popover content={<div>
      {content}
      {operation}
    </div>}
    open={true} placement={getCurrentObj()?.placement}>
      {wrapper}
    </Popover>
  }
    const [, setRenderTick] = useState<number>(0);

  useEffect(() => {
    setRenderTick(1)    
  }, []);
  if(!currentElement||done) {
    return null;
  }
  const mask = <Mask container={currentContainerElement} element={currentElement}  renderMaskContent={(wrapper) => renderPopover(wrapper)}/>;
  

  return createPortal(mask,currentContainerElement);
}
