import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'password'
})
export class PasswordPipe implements PipeTransform {

    transform(value: any): string {
        return '*'.repeat(value * 1);
    }
}