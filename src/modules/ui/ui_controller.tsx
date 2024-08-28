import { type Component } from 'solid-js';
import { render } from 'solid-js/web';
import type { Controller } from '../context/controller';
import UIContainerProvider from './providers/ui_context/ui_context';
import './styles.css';

export interface UIComponentsStore {
  containerPlugins: Component[];
  controlBarPlugins: Component[];
}

export class UIController {
  public name = 'ui_controller';

  // Wrapper element
  public $container!: HTMLDivElement;

  // Manager contructor, links container element and renders
  private constructor($selector: HTMLElement, controller: Controller) {
    render(() => {
      // Register stateChange event for keeping track of state

      return (
        // Render solid elements and get dom ref
        <UIContainerProvider
          ref={this.$container}
          initialController={controller}
        />
      );
    }, $selector);
  }

  static create($selector: HTMLElement, controller: Controller) {
    return new UIController($selector, controller);
  }

  dispose() {
    while (this.$container.firstChild) {
      this.$container.removeChild(this.$container.firstChild);
    }
  }
}
