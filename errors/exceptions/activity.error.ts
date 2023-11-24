class ActivityError extends Error {}

export class ForbiddenCreateActivityError extends ActivityError {
	statusCode = 403

	constructor() {
		super("Forbidden. You cannot create an activity to another student.")
	}
}

export class ForbiddenDeleteActivityError extends ActivityError {
	statusCode = 403

	constructor() {
		super("Forbidden. You cannot delete an activity from another student.")
	}
}

export class ActivityNotFoundError extends ActivityError {
	statusCode = 404

	constructor() {
		super("Not found. The activity was not found.")
	}
}