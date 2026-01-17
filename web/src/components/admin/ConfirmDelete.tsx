"use client";

import { useState } from "react";

export function ConfirmDelete({
	label = "Delete",
	title,
	description,
	onConfirm,
}: {
	label?: string;
	title: string;
	description?: string;
	onConfirm: () => Promise<void>;
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const confirm = async () => {
		setLoading(true);
		await onConfirm();
		setLoading(false);
		setOpen(false);
	};

	return (
		<>
			<button
				className="text-red-600 underline"
				onClick={() => setOpen(true)}
			>
				{label}
			</button>

			{open && (
				<div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
					<div className="bg-background p-6 rounded w-90 space-y-4">
						<h2 className="font-semibold">{title}</h2>
						{description && (
							<p className="text-sm text-muted-foreground">
								{description}
							</p>
						)}

						<div className="flex justify-end gap-2">
							<button disabled={loading} onClick={() => setOpen(false)}>
								Cancel
							</button>

							<button
								className="text-white bg-red-600 px-3 py-1 rounded"
								disabled={loading}
								onClick={confirm}
							>
								{loading ? "Deleting..." : "Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
