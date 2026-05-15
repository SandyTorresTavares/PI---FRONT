import { z } from 'zod';

import { authRequest, authenticatedRequest } from '../services/api';
import type { ProfileResponse, AuthResponse } from '../types/auth';

const tokenSchema = z.string().min(1, 'Token é obrigatório');

const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const registerSchema = z.object({
	name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
	role: z.enum(['aluno', 'professor']),
});

function getValidationErrorMessage(error: unknown): string {
	if (error instanceof z.ZodError) {
		return error.issues[0]?.message || 'Dados inválidos';
	}
	return 'Erro ao validar dados';
}

export async function login(payload: { email: string; password: string }) {
	try {
		const validated = loginSchema.parse(payload);
		return await authRequest<AuthResponse>('/auth/login', 'POST', validated);
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function register(payload: { name: string; email: string; password: string; role: 'aluno' | 'professor' }) {
	try {
		const validated = registerSchema.parse(payload);
		return await authRequest<AuthResponse>('/auth/register', 'POST', validated);
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}

export async function getProfile(token: string) {
	try {
		const validatedToken = tokenSchema.parse(token);
		return await authenticatedRequest<ProfileResponse>('/auth/profile', 'GET', validatedToken);
	} catch (error) {
		return {
			success: false,
			message: getValidationErrorMessage(error),
		};
	}
}
