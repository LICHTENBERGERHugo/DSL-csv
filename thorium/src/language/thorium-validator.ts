import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { ThoriumAstType, Person } from './generated/ast.js';
import type { ThoriumServices } from './thorium-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: ThoriumServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.ThoriumValidator;
    const checks: ValidationChecks<ThoriumAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class ThoriumValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
