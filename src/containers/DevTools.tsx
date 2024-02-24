import { createDevTools } from "@redux-devtools/core";
import { LogMonitor } from "@redux-devtools/log-monitor";
import { SliderMonitor } from "@redux-devtools/slider-monitor";
import { DockMonitor } from "@redux-devtools/dock-monitor";

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>,
);

export default DevTools;
