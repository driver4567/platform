/**
 * Copyright (C) 2013 eXo Platform SAS.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.exoplatform.platform.webui.templates;

import org.exoplatform.resolver.ServletResourceResolver;

import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletContext;

public class PlatformServletResourceResolver extends ServletResourceResolver {
    public PlatformServletResourceResolver(ServletContext context, String scheme) {
        super(context, scheme);
    }

    public boolean isModified(String url, long lastAccess) {
        try {
            URL uri = getResource(url);
            URLConnection con = uri.openConnection();
            if (log.isDebugEnabled())
                log.debug(url + ": " + con.getLastModified() + " " + lastAccess);
            if (con.getLastModified() > lastAccess) {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}
