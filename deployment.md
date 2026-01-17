# Serving multiple applications behind Nginx Proxy Manager

## Recommended architecture
- **Use Nginx Proxy Manager (NPM) as the single public entry point.**
  Keep only ports 80/443 (and 81 for admin) exposed on the host. All apps run
  on the same Docker network and are reached by NPM via internal container
  names. This avoids port conflicts and simplifies TLS management.
- **Attach each app to a shared Docker network.**
  Create a `proxy_net` (external) and connect each compose project to it so NPM
  can reach every container by name.
- **Map one subdomain per app.**
  Point DNS records at the server IP, then configure NPM to reverse-proxy to
  each container. Example: `savvanis.life` for the CV, `token.savvanis.life`
  for the ERC-token demo, and `bot.savvanis.life` for the mean-reversion app.

## Example pattern for your services
- **NPM compose (central):**
  - Expose ports `80:80`, `443:443`, `81:81`.
  - Connect to `proxy_net`.
- **Each app compose:**
  - Connect to `proxy_net`.
  - Remove host port mappings unless you need direct access.
  - Give each service a stable `container_name` so NPM can target it easily.

## Why this works best
- **Single TLS termination.** NPM handles certificates automatically for every
  subdomain.
- **No port collisions.** Apps communicate internally via Docker DNS on the
  shared network.
- **Clear separation.** Each app has its own subdomain and can be scaled or
  redeployed independently.

## Checklist to start
1. Create a shared network once:
   ```bash
   docker network create proxy_net
   ```
2. Ensure NPM uses `proxy_net` as an **external** network.
3. For each compose project, add:
   ```yaml
   networks:
     proxy_net:
       external: true
   ```
4. In NPM, add a Proxy Host for each subdomain and point it to the container
   name + internal port (e.g., `mean-reversion-bot:8000`).
5. Enable SSL for each host in NPM.

## Optional improvements
- **Static CV site**: serve with a lightweight Nginx container and mount your
  `/home/savvaniss/dev/personal/site` folder as a volume.
- **Health checks**: add healthchecks to each container so NPM shows status.
- **Access control**: restrict admin UIs (like NPM on port 81) with firewall
  rules or VPN.
