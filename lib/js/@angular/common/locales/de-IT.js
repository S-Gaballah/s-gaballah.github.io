/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/de-IT", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        return 5;
    }
    exports.default = [
        'de-IT', [['vm.', 'nm.'], ['vorm.', 'nachm.'], u], [['vorm.', 'nachm.'], u, u],
        [
            ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
            ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
        ],
        [
            ['S', 'M', 'D', 'M', 'D', 'F', 'S'], ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
        ],
        [
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            [
                'Jän.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.',
                'Dez.'
            ],
            [
                'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
                'Oktober', 'November', 'Dezember'
            ]
        ],
        [
            ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            [
                'Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
                'Oktober', 'November', 'Dezember'
            ]
        ],
        [['v. Chr.', 'n. Chr.'], u, u], 1, [6, 0],
        ['dd.MM.yy', 'dd.MM.y', 'd. MMMM y', 'EEEE, d. MMMM y'],
        ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{1}, {0}', u, '{1} \'um\' {0}', u],
        [',', '.', ';', '%', '+', '-', 'E', '·', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], '€', 'Euro', {
            'ATS': ['öS'],
            'AUD': ['AU$', '$'],
            'BGM': ['BGK'],
            'BGO': ['BGJ'],
            'CUC': [u, 'Cub$'],
            'DEM': ['DM'],
            'FKP': [u, 'Fl£'],
            'GNF': [u, 'F.G.'],
            'KMF': [u, 'FC'],
            'RON': [u, 'L'],
            'RWF': [u, 'F.Rw'],
            'SYP': [],
            'THB': ['฿'],
            'TWD': ['NT$'],
            'ZMW': [u, 'K']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUtSVQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9jb21tb24vbG9jYWxlcy9kZS1JVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLFNBQVMsTUFBTSxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBZTtRQUNiLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RTtZQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDdEYsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7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QUNkLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDbEIsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2IsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQ2xCLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDaEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUNmLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDbEIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1NBQ2hCO1FBQ0QsTUFBTTtLQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKSwgdiA9IG4udG9TdHJpbmcoKS5yZXBsYWNlKC9eW14uXSpcXC4/LywgJycpLmxlbmd0aDtcbiAgaWYgKGkgPT09IDEgJiYgdiA9PT0gMCkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdkZS1JVCcsIFtbJ3ZtLicsICdubS4nXSwgWyd2b3JtLicsICduYWNobS4nXSwgdV0sIFtbJ3Zvcm0uJywgJ25hY2htLiddLCB1LCB1XSxcbiAgW1xuICAgIFsnUycsICdNJywgJ0QnLCAnTScsICdEJywgJ0YnLCAnUyddLCBbJ1NvLicsICdNby4nLCAnRGkuJywgJ01pLicsICdEby4nLCAnRnIuJywgJ1NhLiddLFxuICAgIFsnU29ubnRhZycsICdNb250YWcnLCAnRGllbnN0YWcnLCAnTWl0dHdvY2gnLCAnRG9ubmVyc3RhZycsICdGcmVpdGFnJywgJ1NhbXN0YWcnXSxcbiAgICBbJ1NvLicsICdNby4nLCAnRGkuJywgJ01pLicsICdEby4nLCAnRnIuJywgJ1NhLiddXG4gIF0sXG4gIFtcbiAgICBbJ1MnLCAnTScsICdEJywgJ00nLCAnRCcsICdGJywgJ1MnXSwgWydTbycsICdNbycsICdEaScsICdNaScsICdEbycsICdGcicsICdTYSddLFxuICAgIFsnU29ubnRhZycsICdNb250YWcnLCAnRGllbnN0YWcnLCAnTWl0dHdvY2gnLCAnRG9ubmVyc3RhZycsICdGcmVpdGFnJywgJ1NhbXN0YWcnXSxcbiAgICBbJ1NvLicsICdNby4nLCAnRGkuJywgJ01pLicsICdEby4nLCAnRnIuJywgJ1NhLiddXG4gIF0sXG4gIFtcbiAgICBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gICAgW1xuICAgICAgJ0rDpG4uJywgJ0ZlYi4nLCAnTcOkcnonLCAnQXByLicsICdNYWknLCAnSnVuaScsICdKdWxpJywgJ0F1Zy4nLCAnU2VwLicsICdPa3QuJywgJ05vdi4nLFxuICAgICAgJ0Rlei4nXG4gICAgXSxcbiAgICBbXG4gICAgICAnSsOkbm5lcicsICdGZWJydWFyJywgJ03DpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXG4gICAgICAnT2t0b2JlcicsICdOb3ZlbWJlcicsICdEZXplbWJlcidcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gICAgWydKw6RuJywgJ0ZlYicsICdNw6RyJywgJ0FwcicsICdNYWknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09rdCcsICdOb3YnLCAnRGV6J10sXG4gICAgW1xuICAgICAgJ0rDpG5uZXInLCAnRmVicnVhcicsICdNw6RyeicsICdBcHJpbCcsICdNYWknLCAnSnVuaScsICdKdWxpJywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLFxuICAgICAgJ09rdG9iZXInLCAnTm92ZW1iZXInLCAnRGV6ZW1iZXInXG4gICAgXVxuICBdLFxuICBbWyd2LiBDaHIuJywgJ24uIENoci4nXSwgdSwgdV0sIDEsIFs2LCAwXSxcbiAgWydkZC5NTS55eScsICdkZC5NTS55JywgJ2QuIE1NTU0geScsICdFRUVFLCBkLiBNTU1NIHknXSxcbiAgWydISDptbScsICdISDptbTpzcycsICdISDptbTpzcyB6JywgJ0hIOm1tOnNzIHp6enonXSwgWyd7MX0sIHswfScsIHUsICd7MX0gXFwndW1cXCcgezB9JywgdV0sXG4gIFsnLCcsICcuJywgJzsnLCAnJScsICcrJywgJy0nLCAnRScsICfCtycsICfigLAnLCAn4oieJywgJ05hTicsICc6J10sXG4gIFsnIywjIzAuIyMjJywgJyMsIyMwwqAlJywgJyMsIyMwLjAwwqDCpCcsICcjRTAnXSwgJ+KCrCcsICdFdXJvJywge1xuICAgICdBVFMnOiBbJ8O2UyddLFxuICAgICdBVUQnOiBbJ0FVJCcsICckJ10sXG4gICAgJ0JHTSc6IFsnQkdLJ10sXG4gICAgJ0JHTyc6IFsnQkdKJ10sXG4gICAgJ0NVQyc6IFt1LCAnQ3ViJCddLFxuICAgICdERU0nOiBbJ0RNJ10sXG4gICAgJ0ZLUCc6IFt1LCAnRmzCoyddLFxuICAgICdHTkYnOiBbdSwgJ0YuRy4nXSxcbiAgICAnS01GJzogW3UsICdGQyddLFxuICAgICdST04nOiBbdSwgJ0wnXSxcbiAgICAnUldGJzogW3UsICdGLlJ3J10sXG4gICAgJ1NZUCc6IFtdLFxuICAgICdUSEInOiBbJ+C4vyddLFxuICAgICdUV0QnOiBbJ05UJCddLFxuICAgICdaTVcnOiBbdSwgJ0snXVxuICB9LFxuICBwbHVyYWxcbl07XG4iXX0=