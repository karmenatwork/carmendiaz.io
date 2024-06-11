"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Popover, Transition } from "@headlessui/react";


import clsx from "clsx";

import { Fragment, useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import avatarImage from "@/images/avatar1.jpg";

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  let isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-purple-800 dark:text-purple-700"
            : "hover:text-purple-500 dark:hover:text-purple-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0 dark:from-purple-400/0 dark:via-purple-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav 
      className={clsx(
        className,
        "hidden sm:flex place-items-start space-x-6"
      )}
    {...props}>
      <ul className="flex ">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </ul>
    </nav>
  );
}



function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...props}
    />
  );
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
  large?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
}

export function Header() {
  let isHomePage = usePathname() === "/";
  let headerRef = useRef<React.ElementRef<"div">>(null);
  let avatarRef = useRef<React.ElementRef<"div">>(null);

  useEffect(() => {}, [isHomePage]);

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-none">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>

              <div className="flex flex-1 ">
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      )}
    </>
  );
}
