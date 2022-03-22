import { SchedulerCbs } from './scheduler';
interface Lifecycle {
    mountedHandlers: any[];
    unmountedHandlers: any[];
    updatedHandlers: any[];
}
export declare function setLifecycleHandlers(): void;
export declare function resetLifecycleHandlers(): void;
export declare function getLifecycleHandlers(): Lifecycle;
export declare function callMounted(handlers: SchedulerCbs): void;
export declare function callUnmounted(handlers: SchedulerCbs): void;
export declare function callUpdated(handlers: SchedulerCbs): void;
export declare function callElementUnmounted(handlers: SchedulerCbs): void;
/**
 * 当前能够使用组件的生命周期函数
 */
export declare function canUseLifecycle(): boolean;
export {};
