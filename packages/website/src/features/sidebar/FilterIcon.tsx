type FilterIconProps = {
	width: number;
	height?: number;
	alt: string;
};

export function FilterIcon({ width, height = width, alt }: FilterIconProps) {
	return (
		<svg
			width={width}
			height={height}
			role="img"
			aria-label={alt}
			viewBox="0 0 35 35"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13.1247 7.29374C12.7379 7.29374 12.367 7.44736 12.0935 7.72079C11.82 7.99423 11.6663 8.36508 11.6663 8.75178C11.6663 9.13847 11.82 9.50933 12.0935 9.78277C12.367 10.0562 12.7379 10.2098 13.1247 10.2098C13.5114 10.2098 13.8824 10.0562 14.1559 9.78277C14.4294 9.50933 14.583 9.13847 14.583 8.75178C14.583 8.36508 14.4294 7.99423 14.1559 7.72079C13.8824 7.44736 13.5114 7.29374 13.1247 7.29374ZM8.99759 7.29374C9.29889 6.44002 9.85763 5.70074 10.5968 5.17783C11.336 4.65491 12.2192 4.3741 13.1247 4.3741C14.0302 4.3741 14.9134 4.65491 15.6525 5.17783C16.3917 5.70074 16.9505 6.44002 17.2518 7.29374H27.708C28.0948 7.29374 28.4657 7.44736 28.7392 7.72079C29.0127 7.99423 29.1663 8.36508 29.1663 8.75178C29.1663 9.13847 29.0127 9.50933 28.7392 9.78277C28.4657 10.0562 28.0948 10.2098 27.708 10.2098H17.2518C16.9505 11.0635 16.3917 11.8028 15.6525 12.3257C14.9134 12.8486 14.0302 13.1295 13.1247 13.1295C12.2192 13.1295 11.336 12.8486 10.5968 12.3257C9.85763 11.8028 9.29889 11.0635 8.99759 10.2098H7.29134C6.90457 10.2098 6.53363 10.0562 6.26014 9.78277C5.98665 9.50933 5.83301 9.13847 5.83301 8.75178C5.83301 8.36508 5.98665 7.99423 6.26014 7.72079C6.53363 7.44736 6.90457 7.29374 7.29134 7.29374H8.99759ZM21.8747 16.042C21.4879 16.042 21.117 16.1956 20.8435 16.469C20.57 16.7424 20.4163 17.1133 20.4163 17.5C20.4163 17.8867 20.57 18.2575 20.8435 18.531C21.117 18.8044 21.4879 18.958 21.8747 18.958C22.2614 18.958 22.6324 18.8044 22.9059 18.531C23.1794 18.2575 23.333 17.8867 23.333 17.5C23.333 17.1133 23.1794 16.7424 22.9059 16.469C22.6324 16.1956 22.2614 16.042 21.8747 16.042ZM17.7476 16.042C18.0489 15.1882 18.6076 14.449 19.3468 13.926C20.086 13.4031 20.9692 13.1223 21.8747 13.1223C22.7802 13.1223 23.6634 13.4031 24.4025 13.926C25.1417 14.449 25.7005 15.1882 26.0018 16.042H27.708C28.0948 16.042 28.4657 16.1956 28.7392 16.469C29.0127 16.7424 29.1663 17.1133 29.1663 17.5C29.1663 17.8867 29.0127 18.2575 28.7392 18.531C28.4657 18.8044 28.0948 18.958 27.708 18.958H26.0018C25.7005 19.8118 25.1417 20.551 24.4025 21.0739C23.6634 21.5969 22.7802 21.8777 21.8747 21.8777C20.9692 21.8777 20.086 21.5969 19.3468 21.0739C18.6076 20.551 18.0489 19.8118 17.7476 18.958H7.29134C6.90457 18.958 6.53363 18.8044 6.26014 18.531C5.98665 18.2575 5.83301 17.8867 5.83301 17.5C5.83301 17.1133 5.98665 16.7424 6.26014 16.469C6.53363 16.1956 6.90457 16.042 7.29134 16.042H17.7476ZM13.1247 24.7902C12.7379 24.7902 12.367 24.9438 12.0935 25.2172C11.82 25.4907 11.6663 25.8615 11.6663 26.2482C11.6663 26.6349 11.82 27.0058 12.0935 27.2792C12.367 27.5526 12.7379 27.7062 13.1247 27.7062C13.5114 27.7062 13.8824 27.5526 14.1559 27.2792C14.4294 27.0058 14.583 26.6349 14.583 26.2482C14.583 25.8615 14.4294 25.4907 14.1559 25.2172C13.8824 24.9438 13.5114 24.7902 13.1247 24.7902ZM8.99759 24.7902C9.29889 23.9364 9.85763 23.1972 10.5968 22.6743C11.336 22.1513 12.2192 21.8705 13.1247 21.8705C14.0302 21.8705 14.9134 22.1513 15.6525 22.6743C16.3917 23.1972 16.9505 23.9364 17.2518 24.7902H27.708C28.0948 24.7902 28.4657 24.9438 28.7392 25.2172C29.0127 25.4907 29.1663 25.8615 29.1663 26.2482C29.1663 26.6349 29.0127 27.0058 28.7392 27.2792C28.4657 27.5526 28.0948 27.7062 27.708 27.7062H17.2518C16.9505 28.56 16.3917 29.2992 15.6525 29.8222C14.9134 30.3451 14.0302 30.6259 13.1247 30.6259C12.2192 30.6259 11.336 30.3451 10.5968 29.8222C9.85763 29.2992 9.29889 28.56 8.99759 27.7062H7.29134C6.90457 27.7062 6.53363 27.5526 6.26014 27.2792C5.98665 27.0058 5.83301 26.6349 5.83301 26.2482C5.83301 25.8615 5.98665 25.4907 6.26014 25.2172C6.53363 24.9438 6.90457 24.7902 7.29134 24.7902H8.99759Z"
				fill="currentColor"
			></path>
		</svg>
	);
}
