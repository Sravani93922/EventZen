package com.eventzen.backend_spring.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("=== JWT FILTER HIT ===");

        try {
            // 🔹 Get Authorization header
            String headerAuth = request.getHeader("Authorization");
            System.out.println("HEADER: " + headerAuth);

            // 🔹 Check header format
            if (headerAuth != null && headerAuth.startsWith("Bearer ")) {

                // 🔹 Extract token
                String token = headerAuth.substring(7);
                System.out.println("TOKEN: " + token);

                // 🔹 Validate token
                boolean isValid = jwtUtils.validateJwtToken(token);
                System.out.println("IS VALID: " + isValid);

                if (isValid) {

                    // 🔹 Extract user info
                    String userId = jwtUtils.getUserId(token);
                    String role = jwtUtils.getRole(token);

                    System.out.println("USER ID: " + userId);
                    System.out.println("ROLE: " + role);

                    // 🔹 Create authority
                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority(role);

                    // 🔹 Create authentication object
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userId,
                                    null,
                                    Collections.singletonList(authority)
                            );

                    // 🔥 SET AUTHENTICATION (MOST IMPORTANT)
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println("AUTHENTICATION SET SUCCESS");
                }

            } else {
                System.out.println("NO VALID AUTH HEADER");
            }

        } catch (Exception e) {
            System.out.println("AuthTokenFilter Error: " + e.getMessage());
        }

        // 🔹 Continue request
        filterChain.doFilter(request, response);
    }
}