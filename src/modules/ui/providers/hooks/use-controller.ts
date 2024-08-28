import type { Controller } from '../../../context/controller';
import { useVxdkContext } from '../ui_context/ui_context';

export function useVxdkController<T>(selectFn: (controller: Controller) => T) {
  const { controller } = useVxdkContext();
  return selectFn(controller);
}

export function useVxdk() {
  return useVxdkController(selectController);
}

function selectController(controller: Controller) {
  return controller;
}
