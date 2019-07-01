import { switchMap, debounceTime, distinctUntilChanged, distinct, catchError } from 'rxjs/operators';
import { of } from 'rxjs';