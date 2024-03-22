"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<aside className="sidebar">
			<div className="flex flex-col gap-4 size-full">
				<Link href="/" className="sidebar-logo">
					<Image
						src="/assets/images/logo-text.svg"
						alt="logo"
						width={180}
						height={28}
					/>
				</Link>

				<nav className="sidebar-nav">
					<SignedIn>
						<ul className="sidebar-nav_elements">
							{navLinks.slice(0, 6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.route}
										className={cn(
											"sidebar-nav_element",
											"group",
											"text-gray-700",
											{
												"bg-purple-gradient": isActive,
												"text-white": isActive,
											}
										)}
									>
										<Link className="sidebar-link" href={link.route}>
											<Image
												src={link.icon}
												alt={link.route}
												width={24}
												height={24}
												className={cn({ ["brightness-200"]: isActive })}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>

						<ul className="sidebar-nav_elements">
							{navLinks.slice(6).map((link) => {
								const isActive = link.route === pathname;
								return (
									<li
										key={link.route}
										className={cn(
											"sidebar-nav_element",
											"group",
											"text-gray-700",
											{
												["bg-purple-gradient"]: isActive,
												["text-white"]: isActive,
											}
										)}
									>
										<Link className="sidebar-link" href={link.route}>
											<Image
												src={link.icon}
												alt={link.route}
												width={24}
												height={24}
												className={cn({ ["brightness-200"]: isActive })}
											/>
											{link.label}
										</Link>
									</li>
								);
							})}
							<li className="flex p-4 cursor-pointer w-full">
								<UserButton afterSignOutUrl="/" showName />
							</li>
						</ul>
					</SignedIn>

					<SignedOut>
						<Button asChild className="button bg-purple-gradient bg-cover">
							<Link href="/sign-in">Login</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
