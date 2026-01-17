"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

export function FormModal({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: ReactNode;
}) {
	return (
		<div className="fixed inset-0 bg-black/50 z-50 grid place-items-center">
			<div className="bg-background w-full max-w-2xl rounded-lg shadow-lg">
				{/* Header */}
				<div className="flex justify-between items-center px-6 py-4 border-b">
					<h2 className="text-lg font-medium">{title}</h2>
					<button onClick={onClose}>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
