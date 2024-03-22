"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const MobileNav = () => {
	const pathname = usePathname();

	return (
		<header className="header">
			<Image
				src="/assets/images/logo-text.svg"
				alt="logo"
				width={153}
				height={23}
			/>
			<nav className="flex gap-2">
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
					<Sheet>
						<SheetTrigger>
							<Image
								className="cursor-pointer"
								src="/assets/icons/menu.svg"
								alt="menu"
								width={32}
								height={32}
							/>
						</SheetTrigger>
						<SheetContent className="sheet-content sm:w-64">
							<>
								<Image
									src="/assets/images/logo-text.svg"
									alt="logo"
									width={153}
									height={23}
								/>

								<ul className="header-nav_elements">
									{navLinks.map((link) => {
										const isActive = link.route === pathname;
										return (
											<li
												className={cn(
													"text-dark-700 flex p-18 whitespace-nowrap",
													{ "gradient-text": isActive }
												)}
												key={link.route}
											>
												<Link
													className="sidebar-link cursor-pointer"
													href={link.route}
												>
													<Image
														src={link.icon}
														alt={link.route}
														width={24}
														height={24}
													/>
													{link.label}
												</Link>
											</li>
										);
									})}
								</ul>
							</>
						</SheetContent>
					</Sheet>
				</SignedIn>

				<SignedOut>
					<Button asChild className="button bg-purple-gradient bg-cover">
						<Link href="/sign-in">Login</Link>
					</Button>
				</SignedOut>
			</nav>
		</header>
	);
};

export default MobileNav;
