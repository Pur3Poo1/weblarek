import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';

export class Form<T> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

        container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(`${container.name}:submit`);
        });

        container.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.name) {
                this.events.emit(`${container.name}:change`, {
                    field: target.name,
                    value: target.value,
                });
            }
        });
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }

    set canSubmit(value: boolean) {
        this.submitButton.disabled = !value;
    }
}