export interface Task {
	id: number;
	title: string;
	description: string;
	completed: boolean | number;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateTaskPayload {
	token: string;
	title: string;
	description: string;
}

export interface UpdateTaskPayload {
	token: string;
	id: number;
	title: string;
	description: string;
}

export interface DeleteTaskPayload {
	token: string;
	id: number;
}

export interface UpdateTaskStatusPayload {
	token: string;
	id: number;
	completed: boolean;
}

export interface GetTasksPayload {
	token: string;
	page?: number;
	perPage?: number;
	completed?: boolean;
	status?: 'pending' | 'done';
}

export interface GetTasksData {
	tasks: Task[];
	total?: number;
}

export type TaskActionResult<T> = {
	success: boolean;
	message: string;
	data?: T;
};
