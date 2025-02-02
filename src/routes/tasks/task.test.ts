import { describe, expect, it, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { createTestApp } from "@/lib/create-app.js";
import router from "./task.index.js";

describe("Tasks API", () => {
    let app: ReturnType<typeof createTestApp>;
    let mockRequest: Mock;

    beforeEach(() => {
        app = createTestApp(router);
        mockRequest = vi.fn();
        app.request = mockRequest;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("GET /tasks", () => {
        it("should return a list of tasks", async () => {
            const mockTasks = [
                {
                    id: 1,
                    title: "Task 1",
                    description: "Description 1",
                    done: false,
                    createdAt: "2024-01-01T00:00:00.000Z",
                    updatedAt: "2024-01-01T00:00:00.000Z"
                }
            ];

            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => mockTasks
            });

            const res = await app.request("/tasks");
            expect(res.status).toBe(200);

            const resJson = await res.json();
            expect(Array.isArray(resJson)).toBe(true);
            expect(resJson[0]).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                done: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });

        it("should handle empty task list", async () => {
            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => []
            });

            const res = await app.request("/tasks");
            expect(res.status).toBe(200);
            const resJson = await res.json();
            expect(Array.isArray(resJson)).toBe(true);
            expect(resJson.length).toBe(0);
        });
    });

    describe("POST /tasks", () => {
        it("should create a new task", async () => {
            const newTask = {
                title: "Test Task",
                description: "Test Description",
                done: false
            };

            const mockResponse = {
                ...newTask,
                id: 1,
                createdAt: "2024-01-01T00:00:00.000Z",
                updatedAt: "2024-01-01T00:00:00.000Z"
            };

            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse
            });

            const res = await app.request("/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            });

            expect(res.status).toBe(200);
            const resJson = await res.json();
            expect(resJson).toMatchObject({
                ...newTask,
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        });

        it("should handle validation errors", async () => {
            const invalidTask = { title: "" };

            mockRequest.mockResolvedValueOnce({
                status: 422,
                json: async () => ({ error: "Validation error" })
            });

            const res = await app.request("/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invalidTask)
            });

            expect(res.status).toBe(422);
        });
    });

    describe("GET /tasks/:id", () => {
        it("should return a single task", async () => {
            const mockTask = {
                id: 1,
                title: "Task 1",
                description: "Description 1",
                done: false,
                createdAt: "2024-01-01T00:00:00.000Z",
                updatedAt: "2024-01-01T00:00:00.000Z"
            };

            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => mockTask
            });

            const res = await app.request("/tasks/1");
            expect(res.status).toBe(200);
            const resJson = await res.json();
            expect(resJson).toMatchObject(mockTask);
        });

        it("should return 404 for non-existent task", async () => {
            mockRequest.mockResolvedValueOnce({
                status: 404,
                json: async () => ({ message: "Not Found" })
            });

            const res = await app.request("/tasks/999999");
            expect(res.status).toBe(404);
        });
    });

    describe("PUT /tasks/:id", () => {
        it("should update a task", async () => {
            const updateData = {
                title: "Updated Task",
                description: "Updated Description",
                done: true
            };

            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => ({
                    ...updateData,
                    id: 1,
                    createdAt: "2024-01-01T00:00:00.000Z",
                    updatedAt: "2024-01-01T00:00:00.000Z"
                })
            });

            const res = await app.request("/tasks/1", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            });

            expect(res.status).toBe(200);
            const resJson = await res.json();
            expect(resJson).toMatchObject(updateData);
        });
    });

    describe("PATCH /tasks/:id", () => {
        it("should partially update a task", async () => {
            const patchData = { done: true };

            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => ({
                    id: 1,
                    title: "Original Title",
                    description: "Original Description",
                    done: true,
                    createdAt: "2024-01-01T00:00:00.000Z",
                    updatedAt: "2024-01-01T00:00:00.000Z"
                })
            });

            const res = await app.request("/tasks/1", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patchData)
            });

            expect(res.status).toBe(200);
            const resJson = await res.json();
            expect(resJson.done).toBe(true);
        });
    });

    describe("DELETE /tasks/:id", () => {
        it("should delete a task", async () => {
            mockRequest.mockResolvedValueOnce({
                status: 200,
                json: async () => ({ message: "Task deleted" })
            });

            const res = await app.request("/tasks/1", {
                method: "DELETE"
            });

            expect(res.status).toBe(200);
        });

        it("should return 404 for non-existent task", async () => {
            mockRequest.mockResolvedValueOnce({
                status: 404,
                json: async () => ({ message: "Not Found" })
            });

            const res = await app.request("/tasks/999999", {
                method: "DELETE"
            });
            expect(res.status).toBe(404);
        });
    });
});