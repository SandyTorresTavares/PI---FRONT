export type RequestResult<T> = {
	success: boolean;
	message: string;
	data?: T;
};

export type ApiResponse = {
	message: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function authRequest<T>(
	path: string,
	method: 'POST' | 'GET',
	body?: any
): Promise<RequestResult<T>> {
	try {
		console.log('[API] Enviando para', `${API_BASE_URL}${path}`);
		if (body) console.log('[API] Payload:', body);
		const res = await fetch(`${API_BASE_URL}${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		let data;
		const contentType = res.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			data = await res.json();
		} else {
			const text = await res.text();
			console.error('[API] Resposta não-JSON:', text);
			return { success: false, message: 'Resposta não-JSON recebida da API' };
		}
		console.log('[API] Resposta:', data);
		if (!res.ok) {
			return { success: false, message: data.message || 'Erro na requisição' };
		}
		return { success: true, message: data.message || 'Sucesso', data };
	} catch (error: any) {
		console.error('[API] Erro:', error);
		return { success: false, message: error.message || 'Erro desconhecido' };
	}
}

export async function authenticatedRequest<T>(
	path: string,
	method: 'POST' | 'GET' | 'PUT' | 'DELETE',
	token: string,
	body?: any
): Promise<RequestResult<T>> {
	try {
		console.log('[API] Enviando para', `${API_BASE_URL}${path}`);
		if (body) console.log('[API] Payload:', body);
		const res = await fetch(`${API_BASE_URL}${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		let data;
		const contentType = res.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			data = await res.json();
		} else {
			const text = await res.text();
			console.error('[API] Resposta não-JSON:', text);
			return { success: false, message: 'Resposta não-JSON recebida da API' };
		}
		console.log('[API] Resposta:', data);
		if (!res.ok) {
			return { success: false, message: data.message || 'Erro na requisição' };
		}
		return { success: true, message: data.message || 'Sucesso', data };
	} catch (error: any) {
		console.error('[API] Erro:', error);
		return { success: false, message: error.message || 'Erro desconhecido' };
	}
}
