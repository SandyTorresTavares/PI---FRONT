import { z } from 'zod';
import { authenticatedRequest } from '../services/api';
import type { ApiResponse, RequestResult } from '../services/api';
import type {
	Task,
	TaskActionResult,
	CreateTaskPayload,
	GetTasksPayload,
	UpdateTaskPayload,
	DeleteTaskPayload,
	UpdateTaskStatusPayload,
	GetTasksData,
} from '../types/task';

const tokenSchema = z.string().min(1, 'Token é obrigatório');

const createTaskSchema = z.object({
	token: tokenSchema,
	title: z.string().min(1, 'Título é obrigatório'),
	description: z.string().min(1, 'Descrição é obrigatória'),
});

const getTasksSchema = z.object({
	token: tokenSchema,
	page: z.number().int().positive().optional(),
	perPage: z.number().int().positive().optional(),
	completed: z.boolean().optional(),
	status: z.enum(['pending', 'done']).optional(),
});

const updateTaskSchema = z.object({
	token: tokenSchema,
	id: z.number().int().positive('ID inválido'),
	title: z.string().min(1, 'Título é obrigatório'),
	description: z.string().min(1, 'Descrição é obrigatória'),
});

const deleteTaskSchema = z.object({
	token: tokenSchema,
	id: z.number().int().positive('ID inválido'),
});

const updateTaskStatusSchema = z.object({
	token: tokenSchema,
	id: z.number().int().positive('ID inválido'),
	completed: z.boolean(),
});

function getValidationErrorMessage(error: unknown): string {
	if (error instanceof z.ZodError) {
		return error.issues[0]?.message || 'Dados inválidos';
	}
	return 'Erro ao validar dados';
}

export async function createTask(payload: CreateTaskPayload): Promise<TaskActionResult<ApiResponse>> {
	try {
		const validatedPayload = createTaskSchema.parse(payload);
		return authenticatedRequest<ApiResponse>('/tasks', 'POST', validatedPayload.token, {
			title: validatedPayload.title,
			description: validatedPayload.description,
		});
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function getTasks(payload: GetTasksPayload): Promise<TaskActionResult<GetTasksData>> {
	try {
		const validatedPayload = getTasksSchema.parse(payload);

		const params = new URLSearchParams();

		if (validatedPayload.page) {
			params.set('page', String(validatedPayload.page));
		}

		if (validatedPayload.perPage) {
			params.set('perPage', String(validatedPayload.perPage));
		}

		if (typeof validatedPayload.completed === 'boolean') {
			params.set('completed', String(validatedPayload.completed));
		}

		if (validatedPayload.status) {
			params.set('status', validatedPayload.status);
		}

		const query = params.toString();
		const path = query ? `/tasks?${query}` : '/tasks';
		return authenticatedRequest<GetTasksData>(path, 'GET', validatedPayload.token);
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function updateTask(payload: UpdateTaskPayload): Promise<TaskActionResult<ApiResponse>> {
	try {
		const validatedPayload = updateTaskSchema.parse(payload);
		return authenticatedRequest<ApiResponse>(`/tasks/${validatedPayload.id}`, 'PUT', validatedPayload.token, {
			title: validatedPayload.title,
			description: validatedPayload.description,
		});
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function deleteTask(payload: DeleteTaskPayload): Promise<TaskActionResult<ApiResponse>> {
	try {
		const validatedPayload = deleteTaskSchema.parse(payload);
		return authenticatedRequest<ApiResponse>(`/tasks/${validatedPayload.id}`, 'DELETE', validatedPayload.token);
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function updateTaskStatus(payload: UpdateTaskStatusPayload): Promise<TaskActionResult<ApiResponse>> {
	try {
		const validatedPayload = updateTaskStatusSchema.parse(payload);
		return authenticatedRequest<ApiResponse>(`/tasks/${validatedPayload.id}/progress`, 'PUT', validatedPayload.token, {
			completed: validatedPayload.completed,
		});
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}
