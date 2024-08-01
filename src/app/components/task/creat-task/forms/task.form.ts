import { FormGroup, FormControl } from "@angular/forms";

export const taskForm = () => new FormGroup({
    userId: new FormControl(null),
    endDate: new FormControl(null),
    statusOrCarries: new FormControl(null),
});