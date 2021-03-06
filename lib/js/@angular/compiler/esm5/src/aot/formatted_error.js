/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { syntaxError } from '../util';
var FORMATTED_MESSAGE = 'ngFormattedMessage';
function indentStr(level) {
    if (level <= 0)
        return '';
    if (level < 6)
        return ['', ' ', '  ', '   ', '    ', '     '][level];
    var half = indentStr(Math.floor(level / 2));
    return half + half + (level % 2 === 1 ? ' ' : '');
}
function formatChain(chain, indent) {
    if (indent === void 0) { indent = 0; }
    if (!chain)
        return '';
    var position = chain.position ?
        chain.position.fileName + "(" + (chain.position.line + 1) + "," + (chain.position.column + 1) + ")" :
        '';
    var prefix = position && indent === 0 ? position + ": " : '';
    var postfix = position && indent !== 0 ? " at " + position : '';
    var message = "" + prefix + chain.message + postfix;
    return "" + indentStr(indent) + message + ((chain.next && ('\n' + formatChain(chain.next, indent + 2))) || '');
}
export function formattedError(chain) {
    var message = formatChain(chain) + '.';
    var error = syntaxError(message);
    error[FORMATTED_MESSAGE] = true;
    error.chain = chain;
    error.position = chain.position;
    return error;
}
export function isFormattedError(error) {
    return !!error[FORMATTED_MESSAGE];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVkX2Vycm9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29tcGlsZXIvc3JjL2FvdC9mb3JtYXR0ZWRfZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQW1CcEMsSUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztBQUUvQyxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzlCLElBQUksS0FBSyxJQUFJLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUMxQixJQUFJLEtBQUssR0FBRyxDQUFDO1FBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckUsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsT0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQXdDLEVBQUUsTUFBa0I7SUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtJQUMvRSxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsVUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBQyxDQUFDLFdBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxPQUFHLENBQUMsQ0FBQztRQUNuRixFQUFFLENBQUM7SUFDUCxJQUFNLE1BQU0sR0FBRyxRQUFRLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUksUUFBUSxPQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRCxJQUFNLE9BQU8sR0FBRyxRQUFRLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBTyxRQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxJQUFNLE9BQU8sR0FBRyxLQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQVMsQ0FBQztJQUV0RCxPQUFPLEtBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sSUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztBQUMvRyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUE0QjtJQUN6RCxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pDLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQW1CLENBQUM7SUFDcEQsS0FBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUNoQyxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBWTtJQUMzQyxPQUFPLENBQUMsQ0FBRSxLQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3N5bnRheEVycm9yfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbiB7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG4gIGxpbmU6IG51bWJlcjtcbiAgY29sdW1uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVkTWVzc2FnZUNoYWluIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBwb3NpdGlvbj86IFBvc2l0aW9uO1xuICBuZXh0PzogRm9ybWF0dGVkTWVzc2FnZUNoYWluO1xufVxuXG5leHBvcnQgdHlwZSBGb3JtYXR0ZWRFcnJvciA9IEVycm9yICYge1xuICBjaGFpbjogRm9ybWF0dGVkTWVzc2FnZUNoYWluO1xuICBwb3NpdGlvbj86IFBvc2l0aW9uO1xufTtcblxuY29uc3QgRk9STUFUVEVEX01FU1NBR0UgPSAnbmdGb3JtYXR0ZWRNZXNzYWdlJztcblxuZnVuY3Rpb24gaW5kZW50U3RyKGxldmVsOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAobGV2ZWwgPD0gMCkgcmV0dXJuICcnO1xuICBpZiAobGV2ZWwgPCA2KSByZXR1cm4gWycnLCAnICcsICcgICcsICcgICAnLCAnICAgICcsICcgICAgICddW2xldmVsXTtcbiAgY29uc3QgaGFsZiA9IGluZGVudFN0cihNYXRoLmZsb29yKGxldmVsIC8gMikpO1xuICByZXR1cm4gaGFsZiArIGhhbGYgKyAobGV2ZWwgJSAyID09PSAxID8gJyAnIDogJycpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDaGFpbihjaGFpbjogRm9ybWF0dGVkTWVzc2FnZUNoYWluIHwgdW5kZWZpbmVkLCBpbmRlbnQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuICBpZiAoIWNoYWluKSByZXR1cm4gJyc7XG4gIGNvbnN0IHBvc2l0aW9uID0gY2hhaW4ucG9zaXRpb24gP1xuICAgICAgYCR7Y2hhaW4ucG9zaXRpb24uZmlsZU5hbWV9KCR7Y2hhaW4ucG9zaXRpb24ubGluZSsxfSwke2NoYWluLnBvc2l0aW9uLmNvbHVtbisxfSlgIDpcbiAgICAgICcnO1xuICBjb25zdCBwcmVmaXggPSBwb3NpdGlvbiAmJiBpbmRlbnQgPT09IDAgPyBgJHtwb3NpdGlvbn06IGAgOiAnJztcbiAgY29uc3QgcG9zdGZpeCA9IHBvc2l0aW9uICYmIGluZGVudCAhPT0gMCA/IGAgYXQgJHtwb3NpdGlvbn1gIDogJyc7XG4gIGNvbnN0IG1lc3NhZ2UgPSBgJHtwcmVmaXh9JHtjaGFpbi5tZXNzYWdlfSR7cG9zdGZpeH1gO1xuXG4gIHJldHVybiBgJHtpbmRlbnRTdHIoaW5kZW50KX0ke21lc3NhZ2V9JHsoY2hhaW4ubmV4dCAmJiAoJ1xcbicgKyBmb3JtYXRDaGFpbihjaGFpbi5uZXh0LCBpbmRlbnQgKyAyKSkpIHx8ICcnfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXR0ZWRFcnJvcihjaGFpbjogRm9ybWF0dGVkTWVzc2FnZUNoYWluKTogRm9ybWF0dGVkRXJyb3Ige1xuICBjb25zdCBtZXNzYWdlID0gZm9ybWF0Q2hhaW4oY2hhaW4pICsgJy4nO1xuICBjb25zdCBlcnJvciA9IHN5bnRheEVycm9yKG1lc3NhZ2UpIGFzIEZvcm1hdHRlZEVycm9yO1xuICAoZXJyb3IgYXMgYW55KVtGT1JNQVRURURfTUVTU0FHRV0gPSB0cnVlO1xuICBlcnJvci5jaGFpbiA9IGNoYWluO1xuICBlcnJvci5wb3NpdGlvbiA9IGNoYWluLnBvc2l0aW9uO1xuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Zvcm1hdHRlZEVycm9yKGVycm9yOiBFcnJvcik6IGVycm9yIGlzIEZvcm1hdHRlZEVycm9yIHtcbiAgcmV0dXJuICEhKGVycm9yIGFzIGFueSlbRk9STUFUVEVEX01FU1NBR0VdO1xufVxuIl19