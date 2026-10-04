// Consistent success responses: { success: true, data, meta? }
export const ok = (res, data, meta, status = 200) =>
  res.status(status).json(meta ? { success: true, data, meta } : { success: true, data });
export const created = (res, data) => ok(res, data, undefined, 201);
