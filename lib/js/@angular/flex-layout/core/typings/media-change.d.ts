/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare type MediaQuerySubscriber = (changes: MediaChange) => void;
/**
 * Class instances emitted [to observers] for each mql notification
 */
export declare class MediaChange {
    matches: boolean;
    mediaQuery: string;
    mqAlias: string;
    suffix: string;
    property: string;
    value: any;
    /**
     * @param matches whether the mediaQuery is currently activated
     * @param mediaQuery e.g. (min-width: 600px) and (max-width: 959px)
     * @param mqAlias e.g. gt-sm, md, gt-lg
     * @param suffix e.g. GtSM, Md, GtLg
     */
    constructor(matches?: boolean, mediaQuery?: string, mqAlias?: string, suffix?: string);
    /** Create an exact copy of the MediaChange */
    clone(): MediaChange;
}
